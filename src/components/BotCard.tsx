import React, { useState, useEffect } from 'react'
import { ListType } from '../types'
import { styled } from 'styled-components';

type PartialList = Partial<ListType>;

interface Props {
    listData: ListType
    handleDelete(id: number): void,
}


export const BotCard: React.FC<Props> = ({ listData, handleDelete }) => {
    // const [formData, setFormData] = useState<PartialList>({
    //     imageUrl: '',
    //     name: ''
    // })

    // const handleInputChange = (field: string, value: string) => {
    //     setFormData(prev => ({ ...prev, [field]: value }))
    // }

    const handleClick = () => {
        const {id} = listData
        handleDelete(id);
    };

    return (
        <FormContainer>
            <div className="parent">
                <div className="details">
                    <img src={listData.imageUrl} className='avatar'/>
                    <p className='name'>{listData.name}</p>
                </div>
                <div className="action"> 
                    <StyledButton style={{background: '#a65252', color: 'white'}} onClick={handleClick}>Delete</StyledButton>
                    <StyledButton style={{background: '#4aac4a', color: 'white'}} onClick={handleClick}>Update</StyledButton>
                </div>
            </div>
        </FormContainer>
    )
}

const FormContainer = styled.div`
    width: 100%;
    margin-bottom: 4px;
    background: #f8f8f8;

    .parent {
        width: 100%;
        align-content: center;
        justify-content: center;
        padding: 10px;
    }

    .details {
        .avatar {
            height: 80px;
        }
    }
    
    .action {
        display: inline-flex;
        gap: 20px;
    }
`

const StyledButton = styled.button`
    width: 50%;
`