import React, { useState } from "react";

function Dropdown({ title, options, onSelectOption }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        onSelectOption(option);
        setIsOpen(false);
    };

    return (
        <div className="dropdown" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <a href="#">
                {title} <span></span>
            </a>
            {isOpen && (
                <ul>
                    {options.map((option, index) => (
                        <li key={index} onClick={() => handleOptionSelect(option)}>
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Dropdown;
