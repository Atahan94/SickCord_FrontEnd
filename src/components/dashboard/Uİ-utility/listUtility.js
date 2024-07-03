import React from "react";
import { List } from "@mui/material";

function generate(element, end, content) {
  console.log("Test-Content:", content)
  const contentLength = content ? content.content.length : end;
  
  return Array.from(
    { length: contentLength},
    (_, i) => i
  ).map((value, indx) => {
    let newElement = React.cloneElement(element, { key: value });
    
    if (content && newElement.props.children !== undefined) {
      
      const firstChild = React.cloneElement(
        newElement.props.children[0],
        content.pass(content.content[indx], indx)
      );

      newElement = React.cloneElement(newElement, {
        children: [firstChild, ...newElement.props.children.slice(1)],
      });
    }
    return newElement;
  });
}

export const ListUtility = (props) => {
  return (
    <List sx={{
      width: '90%',
      color: 'gray',
      ...props.sx, // Combine existing sx with incoming props.sx
    }} >
      {generate(props.children, props.count, props?.content)}
    </List>
  );
};
