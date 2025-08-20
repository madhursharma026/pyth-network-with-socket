import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { PRICE_FEEDS } from '../utils/priceIds.js'

let socket

export default function Home() {
  const [prices, setPrices] = useState(
    Object.keys(PRICE_FEEDS).reduce((acc, key) => {
      acc[key] = 'Loading...'
      return acc
    }, {})
  )

  useEffect(() => {
    socket = io({ path: '/api/socket' })

    socket.on('connect', () => {
      console.log('✅ Connected to server')
    })

    socket.on('price-update', (data) => {
      console.log('📊 Received price update:', data)

      const symbol = Object.keys(PRICE_FEEDS).find(
        (key) => PRICE_FEEDS[key] === data.id
      )

      if (!symbol) return
      if (!data.price) return

      setPrices((prev) => ({
        ...prev,
        [symbol]: `$${Number(data.price).toFixed(2)}`,
      }))
    })

    return () => {
      if (socket) socket.disconnect()
    }
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Live BTC/ETH Price from Pyth</h1>
      {Object.entries(prices).map(([symbol, value]) => (
        <h2 key={symbol}>
          {symbol}/USD: {value}
        </h2>
      ))}
    </div>
  )
}
