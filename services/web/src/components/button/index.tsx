import React from 'react';

interface Props {
  buttonText: string;
  buttonOnClick: () => void;
}

const Button: React.FC<Props> = ({ buttonText, buttonOnClick }) => {
    return (
        <>
            <button type="button" onClick={(): void => buttonOnClick()}>
                {buttonText}
            </button>
        </>
    );
}

export default Button;
