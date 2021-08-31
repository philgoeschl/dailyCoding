import { VDOMAttributes, VDomNode } from "./virtual_dom";

type AttributesUpdater = {
    set: VDOMAttributes,
    remove: string[]
}

interface UpdateOperation {
    kind: 'update',
    attributes: AttributesUpdater,
    children: ChildUpdater[]
}

interface ReplaceOperation {
    kind: 'replace',
    newNode: VDomNode,
    callback?: (elem: HTMLElement | Text) => void
}

interface SkipOperation {
    kind: 'skip'
}

interface RemoveOperation {
    kind: 'remove'
}

interface InserOperation {
    kind: 'insert',
    node: VDomNode
}

export type VDomNodeUpdater = 
    | UpdateOperation
    | ReplaceOperation
    | SkipOperation

export type ChildUpdater = 
    | UpdateOperation
    | ReplaceOperation
    | RemoveOperation
    | SkipOperation
    | InserOperation

const skip = (): SkipOperation => ({ kind: 'skip'} )

const replace = (newNode: VDomNode): ReplaceOperation => ({ kind: 'replace', newNode })

const update = (attributes: AttributesUpdater, children: ChildUpdater[]): UpdateOperation => ({
    kind: 'update',
    attributes,
    children
})

const remove = (): RemoveOperation => ({ kind: 'remove' })

const insert = (node: VDomNode): InserOperation => ({ kind: 'insert', node })

const isEqual = (val1: any, val2: any): boolean => {
    return false
}

export const createDiff = (oldNode: VDomNode, newNode: VDomNode): VDomNodeUpdater => {
    // skip over text nodes with the same text
    if (oldNode.kind == 'text' && newNode.kind == 'text' && oldNode.value == newNode.value) {
        return skip()
    }


    // If a textnode is updated we need to replace it completely
    if (oldNode.kind == 'text' || newNode.kind == 'text') {
        return replace(newNode)
    }

    if(oldNode.kind == 'component' && newNode.kind == 'component' && oldNode.component == newNode.component && oldNode.instance) {
        newNode.instance = oldNode.instance
        if(isEqual(oldNode.props, newNode.props)) return skip()
        return newNode.instance.setProps(newNode.props)
    }

    if(oldNode.kind == 'component') {
        oldNode.instance.unmount()
        oldNode.instance = null
        return replace(newNode)
    }

    if(newNode.kind == 'component') {
        newNode.instance = new newNode.component()
        return {
            kind: 'replace',
            newNode: newNode.instance.initProps(newNode.props),
            callback: e => newNode.instance.notifyMounted(e)
        }
    }

    //If the tagname of a node is changed we have to replace it completely
    if (oldNode.tagname != newNode.tagname) {
        return replace(newNode)
    }

    const attUpdater: AttributesUpdater = {
        remove: Object.keys(oldNode.props || {})
            .filter(att => Object.keys(newNode).indexOf(att) == -1),
        set: Object.keys(newNode.props || {})
            .filter(att => oldNode.props[att] != newNode.props[att])
            .reduce((upd, att) =>  ({ ...upd, [att]: newNode.props[att] }), {})
    }

    const childsUpdater: ChildUpdater[] = childsDiff((oldNode.children || []), (newNode.children || []))

    return update(attUpdater, childsUpdater)

    // rest of diffing
}


const removeUntilKey = (operations: ChildUpdater[], elems: [string | number, VDomNode][], key: string | number) => {
    while(elems[0] && elems[0][0] != key) {
        if(elems[0][1].kind == 'component'){
            elems[0][1].instance.unmount()
            elems[0][1].instance = null
        }
        operations.push(remove())
        elems.shift()
    }
}

const insertUntilKey = (operations: ChildUpdater[], elems: [string | number, VDomNode][], key: string | number) => {
    while(elems[0] && elems[0][0] != key) {
        operations.push(insert(elems.shift()[1]))
    }
}


const childsDiff = (oldChilds: VDomNode[], newChilds: VDomNode[]): ChildUpdater[] => {
    const remainingOldChilds: [string | number, VDomNode][] = oldChilds.map(c => [c.key, c])
    const remainingNewChilds: [string | number, VDomNode][] = newChilds.map(c => [c.key, c])

    const operations: ChildUpdater[] = []

    // find the first element that got updated
    let [ nextUpdateKey ] = remainingOldChilds.find(k => remainingNewChilds.map(k => k[0]).indexOf(k[0]) != -1) || [null]

    while(nextUpdateKey) {

        // first remove all old childs before the update
        removeUntilKey(operations, remainingOldChilds, nextUpdateKey)

        // then insert all new childs before the update
        insertUntilKey(operations, remainingNewChilds, nextUpdateKey)

        // create the update
        operations.push(createDiff(remainingOldChilds.shift()[1], remainingNewChilds.shift()[1]))

        // find the next update
        ; [ nextUpdateKey ] = remainingOldChilds.find(k => remainingNewChilds.map(k => k[0]).indexOf(k[0]) != -1) || [null]        
    }
    
    // remove all remaining old childs after the last update
    removeUntilKey(operations, remainingOldChilds, undefined)

    // insert all remaining new childs after the last update
    insertUntilKey(operations, remainingNewChilds, undefined)

    
    return operations
}