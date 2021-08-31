import { createDiff, VDomNodeUpdater } from "./diff"
import { applyUpdate } from "./render"
import { VDomNode } from "./virtual_dom"

export abstract class Component<P, S> {

    protected props: P
    protected state: S

    private currentRootNode: VDomNode
    private mountedElement : HTMLElement | Text

    protected setState(updater: (s:S) => S) {
        if(this.mountedElement == undefined) throw new Error("you are updating an umounted component")
        this.state = updater(this.state)
        applyUpdate(this.mountedElement, this.getUpdateDiff())
    }

    // called when the mounted element recieves new props
    public setProps(props: P): VDomNodeUpdater {
        if(this.mountedElement == null) throw new Error("You are setting the props of an unmounted component")

        this.state = this.componentWillReceiveProps(props, this.state)
        this.props = props
        return this.getUpdateDiff()
        
    }

    // called when mounting the element to generate the first VDOM state
    public initProps(props: P): VDomNode {
        this.props = props
        this.currentRootNode = this.render()
        return this.currentRootNode
    }

    private getUpdateDiff() : VDomNodeUpdater {
        const newRootNode = this.render()
        const diff = createDiff(this.currentRootNode, newRootNode)
        if(diff.kind == 'replace') elem => this.mountedElement = elem
        this.currentRootNode = newRootNode
        setTimeout(() => this.componentDidUpdate())
        return diff
    }

    // this gets called when the component is mounted in the real DOM
    public notifyMounted(elem: HTMLElement | Text) {
        this.mountedElement = elem
        setTimeout(() => this.componentDidMount())
    }

    // this gets called when the component will be unmounted in the real DOM
    public unmount() {
        this.componentWillUnmount()
        this.mountedElement = null
    }


    // hooks
    public componentDidMount() {}
    public componentWillReceiveProps(props: P, state: S): S { return state }
    public componentDidUpdate() {}
    public componentWillUnmount() {}


    // the render function each component has to implement
    public abstract render(): VDomNode
}