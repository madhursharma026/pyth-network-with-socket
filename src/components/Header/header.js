import useTheme from '@/hooks/useTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Col, Offcanvas, Row } from 'react-bootstrap'
import { FaRegBell } from 'react-icons/fa'
import { FaToggleOff, FaToggleOn } from 'react-icons/fa6'
import { FiShoppingCart } from 'react-icons/fi'
import { IoIosMenu } from 'react-icons/io'
import io from 'socket.io-client'
import styles from './header.module.css'

const Header = ({ headerTitle }) => {
  const { theme, toggleTheme } = useTheme()
  const pathname = usePathname()
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [btcPrice, setBtcPrice] = useState('Loading...')
  const [ethPrice, setEthPrice] = useState('Loading...')

  useEffect(() => {
    const socket = io({ path: '/api/BTC-ETH-Price' })

    socket.on('connect', () => console.log('🟢 Connected to live price socket'))

    socket.on('btc-price', (price) => setBtcPrice(price))
    socket.on('eth-price', (price) => setEthPrice(price))

    return () => socket.disconnect()
  }, [])

  return (
    <>
      <div className={styles.headerBoxShadow}>
        <div className="containerWidthGlobalCSS px-sm-2 px-4 align-items-center justify-content-between">
          <Row>
            <Col className={styles.leftColumn}>
              <div className={`d-flex flex-wrap gap-3 ${styles.customFlexGap}`}>
                <div className={`mediumFontSize ${styles.textColor}`}>
                  BTC <br className={styles.whenWillBRCome} />
                  <span className="text-danger">{btcPrice}</span>{' '}
                  <span className="smallFontSize">-225.10 (-0.90%)</span>
                </div>
                <br className={styles.whenWillBRCome} />
                <div className={`mediumFontSize ${styles.textColor}`}>
                  ETH <br className={styles.whenWillBRCome} />
                  <span className="text-danger">{ethPrice}</span>{' '}
                  <span className="smallFontSize">-721.08 (-0.88%)</span>
                </div>
              </div>
            </Col>

            <Col xs="auto" className={styles.verticalDivider}></Col>

            <Col>
              <div className={styles.verticalCenterText}>
                <Link className="text-decoration-none" href="/">
                  <img
                    src="https://kite.zerodha.com/static/images/kite-logo.svg"
                    alt="#ImgNotFound"
                    width={'21px'}
                    height={'14px'}
                  />
                </Link>
                <div className="w-100 text-end">
                  <Link
                    href={'/'}
                    className={`mediumFontSize ${
                      pathname === '/' ? 'text-danger' : ''
                    } text-decoration-none px-xl-3 px-2 ${
                      styles.navMenuHoverStyle
                    } ${styles.textColor}`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href={'/orders'}
                    className={`mediumFontSize ${
                      pathname === '/orders' ? 'text-danger' : ''
                    } text-decoration-none px-xl-3 px-2 ${
                      styles.navMenuHoverStyle
                    } ${styles.textColor}`}
                  >
                    Orders
                  </Link>
                  <Link
                    href={'/holdings'}
                    className={`mediumFontSize ${
                      pathname === '/holdings' ? 'text-danger' : ''
                    } text-decoration-none px-xl-3 px-2 ${
                      styles.navMenuHoverStyle
                    } ${styles.textColor}`}
                  >
                    Holdings
                  </Link>
                  <Link
                    href={'/positions'}
                    className={`mediumFontSize ${
                      pathname === '/positions' ? 'text-danger' : ''
                    } text-decoration-none px-xl-3 px-2 ${
                      styles.navMenuHoverStyle
                    } ${styles.textColor}`}
                  >
                    Positions
                  </Link>
                  <Link
                    href={'/bids'}
                    className={`mediumFontSize ${
                      pathname === '/bids' ? 'text-danger' : ''
                    } text-decoration-none px-xl-3 px-2 ${
                      styles.navMenuHoverStyle
                    } ${styles.textColor}`}
                  >
                    Bids
                  </Link>
                  <Link
                    href={'/funds'}
                    className={`mediumFontSize ${
                      pathname === '/funds' ? 'text-danger' : ''
                    } text-decoration-none px-xl-3 px-2 ${
                      styles.navMenuHoverStyle
                    } ${styles.textColor}`}
                  >
                    Funds
                  </Link>
                  <span
                    className={`mediumFontSize px-xl-3 px-2 ${styles.navMenuHoverStyle} ${styles.textColor}`}
                  >
                    <FiShoppingCart />
                  </span>
                  <span
                    className={`mediumFontSize px-xl-3 px-2 ${styles.navMenuHoverStyle} ${styles.textColor}`}
                  >
                    <FaRegBell />
                  </span>
                  <span
                    className={`mediumFontSize px-xl-3 px-2 ${styles.navMenuHoverStyle} ${styles.textColor}`}
                  >
                    XXX123
                  </span>
                  <span
                    className={`fs-5 px-xl-3 px-2 ${styles.navMenuHoverStyle} ${styles.textColor} ${styles.toggleDisplayInLightMode}`}
                    onClick={toggleTheme}
                  >
                    <FaToggleOff />
                  </span>
                  <span
                    className={`fs-5 px-xl-3 px-2 ${styles.navMenuHoverStyle} ${styles.textColor} ${styles.toggleDisplayInDarkMode}`}
                    onClick={toggleTheme}
                  >
                    <FaToggleOn />
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div
        className={`${styles.headerBoxShadowAfter1125px} containerWidthGlobalCSS px-2 align-items-center justify-content-between py-2`}
      >
        <div className="row">
          <div className="col-4">
            <Link className="text-decoration-none" href="/">
              <img
                src="https://kite.zerodha.com/static/images/kite-logo.svg"
                alt="#ImgNotFound"
                width={'21px'}
                height={'14px'}
              />
            </Link>
          </div>
          <div className="col-4 text-center">
            <span className="text-center">
              <span className={`${styles.textColor} fs-5`}>
                {pathname === '/'
                  ? 'DASHBOARD'
                  : pathname.replace('/', '').toUpperCase()}
              </span>
            </span>
          </div>
          <div className="col-4 text-end">
            <span
              className={`mediumFontSize px-3 ${styles.navMenuHoverStyle} ${styles.textColor}`}
            >
              <FiShoppingCart />
            </span>
            <span
              className={`mediumFontSize px-3 ${styles.navMenuHoverStyle} ${styles.textColor}`}
              onClick={handleShow}
            >
              <IoIosMenu />
            </span>
            <span
              className={`mediumFontSize d-md-inline d-none px-3 ${styles.navMenuHoverStyle} ${styles.textColor}`}
            >
              XXX123
            </span>
            <span
              className={`fs-5 px-3 ${styles.navMenuHoverStyle} ${styles.textColor} ${styles.navMenuHoverStyleBeforeMdScrnInLightMode}`}
              onClick={toggleTheme}
            >
              <FaToggleOff />
            </span>
            <span
              className={`fs-5 px-3 ${styles.navMenuHoverStyle} ${styles.textColor} ${styles.navMenuHoverStyleBeforeMdScrnInDarkMode}`}
              onClick={toggleTheme}
            >
              <FaToggleOn />
            </span>
          </div>
        </div>
      </div>

      <Offcanvas
        show={show}
        onHide={handleClose}
        className={styles.headerOffCanvasDisplay}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <Link href="/" className="text-decoration-none">
              <img
                src="https://kite.zerodha.com/static/images/kite-logo.svg"
                alt="#ImgNotFound"
                width="21px"
                height="14px"
              />
            </Link>
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <div className="d-flex flex-column">
            {[
              { href: '/', label: 'Dashboard' },
              { href: '/orders', label: 'Orders' },
              { href: '/holdings', label: 'Holdings' },
              { href: '/positions', label: 'Positions' },
              { href: '/bids', label: 'Bids' },
              { href: '/funds', label: 'Funds' },
            ].map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className={`mediumFontSize py-2 ${
                  pathname === href ? 'text-danger' : ''
                } text-decoration-none ${styles.navMenuHoverStyle} ${
                  styles.textColor
                }`}
                onClick={handleClose}
              >
                {label}
              </Link>
            ))}

            <div className="d-flex align-items-center gap-3 mt-3 px-1">
              <span
                className={`mediumFontSize ${styles.navMenuHoverStyle} ${styles.textColor}`}
              >
                <FiShoppingCart />
              </span>
              <span
                className={`mediumFontSize ${styles.navMenuHoverStyle} ${styles.textColor}`}
              >
                <FaRegBell />
              </span>
            </div>
            <p
              className={`mediumFontSize pt-3 ${styles.navMenuHoverStyle} ${styles.textColor}`}
            >
              XXX123
            </p>
            <p
              className={`fs-5 pt-3 ${styles.navMenuHoverStyle} ${styles.textColor} ${styles.toggleDisplayInLightMode}`}
              onClick={toggleTheme}
            >
              <FaToggleOff />
            </p>
            <p
              className={`fs-5 pt-3 ${styles.navMenuHoverStyle} ${styles.textColor} ${styles.toggleDisplayInDarkMode}`}
              onClick={toggleTheme}
            >
              <FaToggleOn />
            </p>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Header
