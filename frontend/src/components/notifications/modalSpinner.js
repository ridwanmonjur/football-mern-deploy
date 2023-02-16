
class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.ele = document.createElement('div');
    }

    componentDidMount() {
        const modalRoot = document.getElementById('modal-root');
        modalRoot.appendChild(this.ele);
    }

    componentWillUnmount() {
        const modalRoot = document.getElementById('modal-root');
        modalRoot.removeChild(this.ele);
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.ele,
        );
    }
}


class Spinner extends React.Component {
    render() {
        return (
            <div className="spinner-box">
                <div className="loading-icon">
                </div>
                <span>Loading...</span>
            </div>
        )
    }
}

