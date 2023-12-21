export const onenter = (node: HTMLElement, params?: {shift: boolean, ctrl: boolean}) => {
    node.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            if (params?.ctrl && !e.ctrlKey) return;
            if (params?.shift && !e.shiftKey) return;
            e.preventDefault()
            node.dispatchEvent(new CustomEvent('enter'))
        }
    })
}