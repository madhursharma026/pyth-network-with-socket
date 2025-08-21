import { PRICE_FEEDS } from '@/utils/priceIds'
import { createContext, useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const PriceContext = createContext()

export function PriceProvider({ children }) {
  const [data, setData] = useState(
    Object.keys(PRICE_FEEDS).map((key) => ({
      name: key,
      price: 'Loading...',
      change: '0.00',
      percent: '0.00',
    }))
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // initialize socket connection
    const socket = io({ path: '/api/socket' })

    socket.on('connect', () => {
      console.log('🟢 Connected to WebSocket')
    })

    socket.on('price-update', (priceFeed) => {
      const symbol = Object.keys(PRICE_FEEDS).find(
        (key) => PRICE_FEEDS[key] === priceFeed.id
      )
      if (!symbol || !priceFeed.price) return

      setData((prev) =>
        prev.map((item) => {
          if (item.name !== symbol) return item

          const newPrice = priceFeed.price * Math.pow(10, priceFeed.expo || 0)

          // 🔹 STEP 1: Load 24h old price from localStorage
          const savedData = JSON.parse(
            localStorage.getItem('price24hData') || '{}'
          )
          let oldPrice = savedData[symbol]

          // 🔹 STEP 2: If no old price saved yet, save this price as reference
          if (!oldPrice) {
            savedData[symbol] = newPrice
            localStorage.setItem('price24hData', JSON.stringify(savedData))
            oldPrice = newPrice
          }

          // 🔹 STEP 3: Calculate change
          const change = newPrice - oldPrice
          const percent = oldPrice ? (change / oldPrice) * 100 : 0

          return {
            name: symbol,
            price: newPrice.toFixed(2),
            change: change.toFixed(2),
            percent: percent.toFixed(2),
          }
        })
      )

      setLoading(false)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <PriceContext.Provider value={{ data, loading }}>
      {children}
    </PriceContext.Provider>
  )
}

export function usePrices() {
  return useContext(PriceContext)
}
