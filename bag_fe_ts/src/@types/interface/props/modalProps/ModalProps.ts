export interface ModalProps{
    open:boolean,
    handleOpen: () => void,
    child: React.ReactNode | React.ReactNode[];
}