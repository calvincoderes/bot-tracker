import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { StyledDiv } from "./styles"
import { CSSTransition } from 'react-transition-group';


interface Props {
    popupSettings: {
        isOpen: boolean,
        message: string
    }
    setPopupSettings(): void,
}

export const Modal: React.FC<Props> = ({ popupSettings, setPopupSettings }) => {

    const { isOpen, message } = popupSettings

    const onCloseHandle = () => {
        setPopupSettings((prev => ({ ...prev, isOpen: false })))
        return false;
    }

    return isOpen && ReactDOM.createPortal(
        <CSSTransition
            in={isOpen}
            timeout={300}
            classNames='popup-content'
            unmountOnExit
        >
            <StyledDiv>
                <div className="popup-overlay" onClick={onCloseHandle}>
                    <div className="popup-content" onClick={e => e.stopPropagation()}>
                        <span className="popup-close" onClick={onCloseHandle}>&times;</span>
                        {message}
                    </div>
                </div>
            </StyledDiv>
        </CSSTransition>,
        document.body
    )
}

Modal.propTypes = {
    popupSettings: PropTypes.any,
    setPopupSettings: PropTypes.any

}