import React from "react";
import { PropTypes } from "prop-types";

const ListGroup = ({ groups, onGroupSelect, selectedGroup }) => {
  return (
    <React.Fragment>
      {groups.map(price => {
        let classes = "list-group-item";
        classes += selectedGroup === price.range ? " active" : "";
        return (
          <li
            key={price.range}
            className={classes}
            onClick={() => onGroupSelect(price)}
            style={{ cursor: "default" }}
          >
            {price.range}
          </li>
        );
      })}
    </React.Fragment>
  );
};

ListGroup.propType = {
  groups: PropTypes.arrayOf(PropTypes.object).isRequired,
  onItemSelect: PropTypes.func.isRequired
};

export default ListGroup;
