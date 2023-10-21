import React from 'react';

interface CardGridProps {
    children: React.ReactNode;
}

const CardGrid: React.FC<CardGridProps> = ({ children }) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {children}
    </div>
);

export default CardGrid;
