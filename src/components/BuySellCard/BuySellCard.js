import { useEffect, useRef, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { FaToggleOn } from 'react-icons/fa'
import { GoAlertFill } from 'react-icons/go'
import styles from './BuySellCard.module.css'

export default function BuySellCard({ type, item, onClose }) {
  const dragStart = useRef({ x: 0, y: 0 })
  const initialPos = useRef({ x: 0, y: 0 })
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [orderType, setOrderType] = useState('regular')
  const [duration, setDuration] = useState('intraday')
  const [marketORLimit, setMarketORLimit] = useState('market')
  const [priceType, setPriceType] = useState('market')

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragging) return
      setPos({
        x: initialPos.current.x + (e.clientX - dragStart.current.x),
        y: initialPos.current.y + (e.clientY - dragStart.current.y),
      })
    }
    const handleMouseUp = () => setDragging(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [dragging])

  const startDrag = (e) => {
    dragStart.current = { x: e.clientX, y: e.clientY }
    initialPos.current = { ...pos }
    setDragging(true)
  }

  if (!item) return null

  return (
    <div
      className={styles.overlay}
      style={{
        transform: `translate(calc(-50% + ${pos.x}px), ${pos.y}px)`,
      }}
    >
      <Card className={styles.cardContainer}>
        <Card.Body className={styles.cardBody}>
          {/* Header */}
          <div
            className={`${styles.headerBar} d-flex justify-content-between align-items-center`}
            onMouseDown={startDrag}
          >
            <div>
              <h6 className={styles.stockName}>{item.name}</h6>
              <small className={styles.exchange}>NSE • ₹{item.price}</small>
            </div>
            {/* <Button
              variant="link"
              onClick={onClose}
            >
              ✕
            </Button> */}
            <div>
              <GoAlertFill className={`${styles.toggleAndAlertBtn}`} />
              <FaToggleOn className={`${styles.toggleAndAlertBtn} ms-3 fs-4`} />
            </div>
          </div>

          {/* Tabs */}
          <div className={`${styles.tabBar} mb-3`}>
            {['Quick', 'Regular', 'MTF', 'Iceberg', 'Cover'].map((tab) => (
              <div
                key={tab}
                className={`${styles.tab} fw-semibold ${
                  orderType === tab.toLowerCase()
                    ? `${
                        type === 'sell'
                          ? 'text-danger border-bottom border-2 border-danger'
                          : 'text-primary border-bottom border-2 border-primary'
                      }`
                    : ''
                }`}
                onClick={() => setOrderType(tab.toLowerCase())}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* Duration */}
          <Row className="mb-3">
            <Col>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  checked={duration === 'intraday'}
                  onChange={() => setDuration('intraday')}
                />
                Intraday MIS
              </label>
            </Col>
            <Col>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  checked={duration === 'longterm'}
                  onChange={() => setDuration('longterm')}
                />
                Longterm CNC
              </label>
            </Col>
            <Col className="text-end">
              <span
                className={`${styles.advanced} fw-semibold ${
                  type === 'sell' ? 'text-danger' : 'text-primary'
                }`}
              >
                Advanced ▼
              </span>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <input
                type="number"
                className={`px-2 ${styles.inputField}`}
                defaultValue={1}
              />
            </Col>

            <Col>
              <div className={styles.inputBox}>
                Market price
                <br />
                {item.price}
              </div>
            </Col>
            <Col>
              <div className={styles.inputBox}>
                Trigger price
                <br />0
              </div>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col></Col>
            <Col>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  checked={marketORLimit === 'market'}
                  onChange={() => setMarketORLimit('market')}
                />
                Market
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  checked={marketORLimit === 'limit'}
                  onChange={() => setMarketORLimit('limit')}
                />
                Limit
              </label>
            </Col>
            <Col className="text-end">
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  checked={marketORLimit === 'sl'}
                  onChange={() => setMarketORLimit('sl')}
                />
                SL
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  checked={marketORLimit === 'slm'}
                  onChange={() => setMarketORLimit('slm')}
                />
                SL-M
              </label>
            </Col>
          </Row>

          {/* Footer */}
          <div
            className={`${styles.footerBar} d-flex justify-content-between align-items-center`}
          >
            <div>
              Required
              <small
                className={`${
                  type == 'sell' ? 'text-danger' : 'text-primary'
                } fw-semibold ms-2 me-3`}
              >
                ₹260.44 +0.51
              </small>
              Available
              <small
                className={`${
                  type == 'sell' ? 'text-danger' : 'text-primary'
                } fw-semibold ms-2`}
              >
                -₹89.80
              </small>
            </div>
            <div>
              {type === 'sell' ? (
                <Button
                  className={`px-3 ${styles.sellBtn}`}
                  variant="danger"
                  size="sm"
                >
                  Sell
                </Button>
              ) : (
                <Button
                  className={`px-3 ${styles.sellBtn}`}
                  variant="primary"
                  size="sm"
                >
                  Buy
                </Button>
              )}

              {type === 'sell' ? (
                <Button
                  className={`px-3 ${styles.cancelBtn}`}
                  variant="outline-danger"
                  size="sm"
                  onClick={onClose}
                >
                  Cancel
                </Button>
              ) : (
                <Button
                  className={`px-3 ${styles.cancelBtn}`}
                  variant="outline-primary"
                  size="sm"
                  onClick={onClose}
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}
