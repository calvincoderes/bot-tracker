import { useState, useEffect, Fragment } from 'react'
import styled from 'styled-components'

import { ListType } from './types'
import { getRandomImage } from './helpers'

import './App.css'

import { BotForm } from './components/BotForm'
import { BotCard } from './components/BotCard'
import { Modal } from './components/Modal'


function App() {
  const storageItem = localStorage.getItem('list') ?? ''
  console.log(storageItem.length)
  const [list, setList] = useState<ListType[]>(storageItem.length > 0 ? JSON.parse(storageItem) : [])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [toUpdate, setToUpdate] = useState(0)

  const addBot = (formData: any) => {
    if (!formData.name) {
      return alert('Input name for your bot');
    }
    if (formData.imageUrl === '') {
      formData.imageUrl = getRandomImage()
    }
    const newItem: ListType = {
      ...formData,
      id: (list.length - 1) + 1,
    }
    const newList: ListType[] = [...list, {...newItem}]
    setList([...newList])
    // setList(prev => ([...prev, { ...newItem }]))
    localStorage.setItem('list', JSON.stringify(newList))

  }

  const removeBot = (id: number) => {
    const newList: ListType[] = list.filter(item => item.id !== id) || [];
    setList([...newList])
    localStorage.setItem('list', JSON.stringify(newList))
  }

  const updateBot = (formData: ListType) => {
    const { id } = formData
    const newList: ListType[] = list.map(item => {
      if (item.id === id) {
        item.imageUrl = formData.imageUrl
        item.name = formData.name
      }
      return item
    }) || [];
    setList([...newList])
    localStorage.setItem('list', JSON.stringify(newList))
  }

  const getBotDetails = (id: number) => {
    return list.filter(item => item.id !== id) || {}
  }

  const handleModalToggle = () => {
    setIsModalOpen(prev => !prev)
  }

  const handleUpdate = (id: number) => {
    setToUpdate(id)
    setIsModalOpen(true)
  }
  


  return (
    <StyledRootWrapper className='root-fragment'>
      <StyledBodyWrapper className='modal-fragment'>
        <Modal isOpen={isModalOpen} onClose={handleModalToggle}>
          <h3>Update</h3>
          <BotForm handleAdd={addBot} />
        </Modal>
      </StyledBodyWrapper>
        <StyledContainer className='main-container'>
          <StyledH1>Bot Tracker</StyledH1>
          <StyledForm>
            <BotForm handleAdd={addBot} />
          </StyledForm>
          <StyledList>
            {list && list.map(data => (
              <div style={{ width: '100%' }}>
                <BotCard listData={data} handleDelete={removeBot} handleUpdate={handleUpdate} />
              </div>
            ))}
            {list.length < 1 && (<StyledHeading>No data to show</StyledHeading>)}
          </StyledList>
        </StyledContainer>
    </StyledRootWrapper>

  )
}

export default App

const StyledRootWrapper = styled.div`

`

const StyledBodyWrapper = styled.div`

`

const StyledContainer = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: flex-start;
align-items: flex-start;
min-height: 100vh;
gap: 2em;
flex-direction: column;
align-content: center;
min-width: 40vw;
`

const StyledH1 = styled.h1`
 align-self: center;
`

const StyledForm = styled.div`
  display: flex;
  background: #fbfbfb;
  min-height: 20vh;
  max-height: 20vh;
  min-width: 100%;
  box-shadow: -1px 7px 8px 1px rgba(110,110,110,0.25);
  padding: 1.5em;
`

const StyledList = styled.div`
  display: flex;
  background: #6a6a6a;
  min-height: 20vh;
  min-width: 100%;
  height: auto;
  box-shadow: -1px 7px 8px 1px rgba(110,110,110,0.25);
  padding: 1.5em;
  flex-direction: column;

`

const StyledHeading = styled.h2`
  color: white
`


