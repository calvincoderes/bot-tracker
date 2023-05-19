import { useState, useEffect } from 'react'
import styled from 'styled-components'

import { ListType } from './types'
import { getRandomImage } from './helpers'

import './App.css'

import { BotForm } from './components/BotForm'
import { BotCard } from './components/BotCard'


function App() {
  const [list, setList] = useState<ListType[]>([])

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
    setList(prev => ([...prev, { ...newItem }]))
  }

  const removeBot = (id: number) => {
    const newList: ListType[] = list.filter(item => item.id !== id) || [];
    setList([...newList])
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
  }

  const getBotDetails = (id: number) => {
    return list.filter(item => item.id !== id) || {}
  }

  useEffect(() => {
    console.log('list test', list)
  }, [list])

  return (
    <>
      <StyledContainer className='main-container'>
        <StyledH1>Bot Tracker</StyledH1>
        <StyledForm>
          <BotForm handleAdd={addBot} />
        </StyledForm>
        <StyledList>
          {/* <FlexContainer> */}
            {list && list.map(data => (
              <div style={{width: '100%'}}>
                <BotCard listData={data} handleDelete={removeBot} />
              </div>
            ))}
          {/* </FlexContainer> */}
        </StyledList>
      </StyledContainer>
    </>
  )
}

export default App

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

const FlexContainer = styled.div`
  display:flex;
`

