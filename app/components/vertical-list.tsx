import React from "react";

interface ListProps {
    children: React.ReactNode; // Accepts any valid React node
}

export default function VerticalList({ children }: ListProps) {
    return (
        <ul>
            {React.Children.map(children, (child, index) => {
                return React.isValidElement(child) ? <li key={index}>{child}</li> : null
            })}
        </ul>
    );
}