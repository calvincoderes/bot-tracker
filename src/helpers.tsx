const defaultImages = [
    "https://api.dicebear.com/6.x/adventurer/svg?seed=Midnight",
    "https://api.dicebear.com/6.x/adventurer/svg?seed=Snowball",
    "https://api.dicebear.com/6.x/adventurer/svg?seed=Milo",
    "https://api.dicebear.com/6.x/adventurer/svg?seed=Tinkerbell"
]

export const getRandomImage = () =>  {
    const min = Math.ceil(0);
    const max = Math.floor(3);
    const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
    return defaultImages[randomIndex]
  }