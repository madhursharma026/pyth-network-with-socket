import { PriceServiceConnection } from '@pythnetwork/price-service-client'
import { Server } from 'socket.io'
import { PRICE_FEEDS } from '../../utils/priceIds'

let io

export default function handler(req, res) {
  if (!io) {
    io = new Server(res.socket.server, {
      path: '/api/socket',
      addTrailingSlash: false,
    })

    res.socket.server.io = io

    const connection = new PriceServiceConnection('https://hermes.pyth.network')

    io.on('connection', async (socket) => {
      console.log('✅ Client connected')

      await connection.subscribePriceFeedUpdates(
        Object.values(PRICE_FEEDS),
        (priceFeed) => {
          const latest = priceFeed.getPriceNoOlderThan(60) // within 60s
          if (!latest) return

          // ✅ Correct expo handling
          const normalizedPrice = latest.price * Math.pow(10, latest.expo)

          console.log('Sending:', normalizedPrice)

          socket.emit('price-update', {
            id: priceFeed.id,
            price: normalizedPrice,
          })
        }
      )
    })
  }

  res.end()
}
