import { PriceServiceConnection } from '@pythnetwork/price-service-client'
import { Server } from 'socket.io'
import { PRICE_FEEDS } from '../../utils/priceIds'

let io

export default function handler(req, res) {
  if (!io) {
    io = new Server(res.socket.server, {
      path: '/api/BTC-ETH-Price', // <- match frontend
      addTrailingSlash: false,
    })
    res.socket.server.io = io

    const connection = new PriceServiceConnection('https://hermes.pyth.network')
    const feeds = [PRICE_FEEDS.BTC, PRICE_FEEDS.ETH]

    io.on('connection', async (socket) => {
      console.log('✅ Client connected for BTC & ETH live prices')

      await connection.subscribePriceFeedUpdates(feeds, (priceFeed) => {
        const latest = priceFeed.getPriceNoOlderThan(60)
        if (!latest) return

        const price = latest.price * Math.pow(10, latest.expo)

        if (priceFeed.id === PRICE_FEEDS.BTC) {
          socket.emit('btc-price', price.toFixed(2))
        } else if (priceFeed.id === PRICE_FEEDS.ETH) {
          socket.emit('eth-price', price.toFixed(2))
        }

        console.log(
          priceFeed.id === PRICE_FEEDS.BTC ? 'BTC:' : 'ETH:',
          price.toFixed(2)
        )
      })
    })
  }

  res.end()
}
