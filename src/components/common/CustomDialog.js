import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  id: PropTypes.string.isRequired,
};

class CustomDialog extends React.Component {
  static modals = [];

  static open = (id) => (e) => {
    e.preventDefault();

    // open modal specified by id
    let modal = CustomDialog.modals.find((x) => x.props.id === id);
    modal.setState({ isOpen: true });
    document.body.classList.add("custom-dialog-open");
  };

  static close = (id) => (e) => {
    e.preventDefault();

    // close modal specified by id
    let modal = CustomDialog.modals.find((x) => x.props.id === id);
    modal.setState({ isOpen: false });
    document.body.classList.remove("custom-dialog-open");
  };

  constructor(props) {
    super(props);

    this.state = { isOpen: false };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // add this modal instance to the modal service so it's accessible from other components
    CustomDialog.modals.push(this);
  }

  componentWillUnmount() {
    // remove this modal instance from modal service
    CustomDialog.modals = CustomDialog.modals.filter(
      (x) => x.props.id !== this.props.id
    );
    this.element.remove();
  }

  handleClick(e) {
    // close modal on background click
    if (e.target.className === "custom-dialog") {
      CustomDialog.close(this.props.id)(e);
    }
  }

  render() {
    return (
      <div
        style={{ display: +this.state.isOpen ? "" : "none" }}
        onClick={this.handleClick}
        ref={(el) => (this.element = el)}
      >
        <div className="custom-dialog">
          <div className="custom-dialog-body">{this.props.children}</div>
        </div>
        <div className="custom-dialog-background"></div>
      </div>
    );
  }
}

CustomDialog.propTypes = propTypes;

export { CustomDialog };
