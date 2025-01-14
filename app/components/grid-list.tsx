import React from "react";

interface GridProps {
    children: React.ReactNode; // Accepts any valid React node
}

export default function GridList({ children }: GridProps) {
    return (
        <ul>
            {React.Children.map(children, (child, index) => {
                return React.isValidElement(child) ? <li key={index}>{child}</li> : null
            })}
        </ul>
    );
}