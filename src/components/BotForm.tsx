import React, { useState, useEffect } from 'react'
import { ListType } from '../types'
import { styled } from 'styled-components';

type PartialList = Partial<ListType>;

interface FormProps {
    handleAdd(formData: PartialList): void
    toUpdate?: number
}


export const BotForm: React.FC<FormProps> = ({ handleAdd, toUpdate }) => {
    const [formData, setFormData] = useState<PartialList>({
        imageUrl: '',
        name: ''
    })

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleClick = () => {
        if (!formData) {
            alert('Input field cannot be empty')
            return;
        }
        handleAdd(formData);
        setFormData({ imageUrl: '', name: '' });
    };

    return (
        <FormContainer>
            <div className="form-container">
                <label htmlFor="image-url">
                    Image URL:
                    <input id="image-url" value={formData.imageUrl} onChange={(e) => handleInputChange('imageUrl', e.target.value)} />
                </label>
                <label htmlFor="bot-name">
                    Bot Name:
                    <input id="bot-name" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                </label>
                <StyledButton id="add-button" onClick={handleClick}>Add Bot</StyledButton>
            </div>
        </FormContainer>
    )
}

const FormContainer = styled.div`
    width: 100%;

    .form-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
    }

    .form-container label {
        display: inline-flex;
        width: 100%;
        align - items: center;
        gap: 20px;
    }

    .form-container input {
        flex: 1;
        margin - left: 5px;
}
`

const StyledButton = styled.button`
background: #7cb5e9;
width: 100%;
color: white;
`



