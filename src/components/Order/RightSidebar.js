import Tabs from '@/components/Tabs/Tabs'
import { Card, Col, Table } from 'react-bootstrap'
import styles from './RightSidebar.module.css'

export default function RightSidebar() {
  const openOrderData = Array.from({ length: 4 }).map((_, i) => ({
    id: i,
    Time: '15:23:26',
    Type: 'BUY',
    Instrument: 'XXXXXXXXXX',
    Product: 'XXX',
    Qty: '0000',
    LTP: '00.00',
    Price: '000.00',
    Status: 'OPEN',
  }))
  const executedOrderData = Array.from({ length: 4 }).map((_, i) => ({
    id: i,
    Time: '15:23:26',
    Type: 'BUY',
    Instrument: 'XXXXXXXXXX',
    Product: 'XXX',
    Qty: '0000',
    LTP: '00.00',
    Price: '000.00',
    Status: 'Complete',
  }))
  return (
    <Col
      className={`px-4 py-3 rightSidebarScrollContainer ${styles.rightSidebarContainer} h-100`}
    >
      <div className={styles.rightColumn}>
        <Tabs
          tabsName={[
            'Orders',
            'GTT',
            'Backets',
            'SIP',
            'Alerts',
            'IPO',
            'Auctions',
          ]}
          activeTab={'Orders'}
        />
        <p className="fs-5 pt-3">Open Orders (4)</p>

        <Table className={`d-none d-lg-table ${styles.tableStyle}`} hover>
          <thead>
            <tr className="mediumFontSize">
              <th className={`${styles.textColor} fw-normal`}>Time</th>
              <th className={`${styles.textColor} fw-normal`}>Type</th>
              <th className={`${styles.textColor} fw-normal`}>Instrument</th>
              <th className={`${styles.textColor} fw-normal`}>Product</th>
              <th className={`${styles.textColor} fw-normal`}>Qty.</th>
              <th className={`${styles.textColor} fw-normal`}>LTP</th>
              <th className={`${styles.textColor} fw-normal`}>Price</th>
              <th className={`${styles.textColor} fw-normal`}>Status</th>
            </tr>
          </thead>
          <tbody>
            {openOrderData.map((item) => (
              <tr key={item.id} className="mediumFontSize">
                <td>{item.Time}</td>
                <td>
                  <span
                    className="px-2 py-1"
                    style={{ background: '#ECF2FD', color: '#121212' }}
                  >
                    {item.Type}
                  </span>
                </td>
                <td>{item.Instrument}</td>
                <td>{item.Product}</td>
                <td>{item.Qty}</td>
                <td>{item.LTP}</td>
                <td>{item.Price}</td>
                <td>
                  <span
                    className="px-2 py-1"
                    style={{ background: '#ECECEC', color: '#121212' }}
                  >
                    {item.Status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {openOrderData.map((item) => (
          <Card
            key={item.id}
            className={`mt-3 d-block d-lg-none ${styles.cardStyle}`}
          >
            <Card.Body>
              <span>Time</span>
              <p className="fw-normal">{item.Time}</p>
              <div className="row">
                <div className="col-6 col-sm-4 col-md-3">
                  <span>Type</span>
                  <p className="fw-normal">{item.Type}</p>
                </div>
                <div className="col-6 col-sm-4 col-md-3">
                  <span>Instrument</span>
                  <p className="fw-normal">{item.Instrument}</p>
                </div>
                <div className="col-6 col-sm-4 col-md-3">
                  <span>Product</span>
                  <p className="fw-normal">{item.Product}</p>
                </div>
                <div className="col-6 col-sm-4 col-md-3">
                  <span>Qty</span>
                  <p className="fw-normal">{item.Qty}</p>
                </div>
                <div className="col-6 col-sm-4 col-md-3">
                  <span>LTP</span>
                  <p className="fw-normal">{item.LTP}</p>
                </div>
                <div className="col-6 col-sm-4 col-md-3">
                  <span>Price</span>
                  <p className="fw-normal">{item.Price}</p>
                </div>
                <div className="col-6 col-sm-4 col-md-3">
                  <span>Status</span>
                  <p className="fw-normal">{item.Status}</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}

        <p className="fs-5 pt-3">Executed Orders (4)</p>

        <Table className={`d-none d-lg-table ${styles.tableStyle}`} hover>
          <thead>
            <tr className="mediumFontSize">
              <th className={`${styles.textColor} fw-normal`}>Time</th>
              <th className={`${styles.textColor} fw-normal`}>Type</th>
              <th className={`${styles.textColor} fw-normal`}>Instrument</th>
              <th className={`${styles.textColor} fw-normal`}>Product</th>
              <th className={`${styles.textColor} fw-normal`}>Qty.</th>
              <th className={`${styles.textColor} fw-normal`}>LTP</th>
              <th className={`${styles.textColor} fw-normal`}>Price</th>
              <th className={`${styles.textColor} fw-normal`}>Status</th>
            </tr>
          </thead>
          <tbody>
            {executedOrderData.map((item) => (
              <tr key={item.id} className="mediumFontSize">
                <td>{item.Time}</td>
                <td>
                  <span
                    className="px-2 py-1"
                    style={{ background: '#ECF2FD', color: '#121212' }}
                  >
                    {item.Type}
                  </span>
                </td>
                <td>{item.Instrument}</td>
                <td>{item.Product}</td>
                <td>{item.Qty}</td>
                <td>{item.LTP}</td>
                <td>{item.Price}</td>
                <td>
                  <span
                    className="px-2 py-1"
                    style={{ background: '#ECF2FD', color: '#121212' }}
                  >
                    {item.Status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {executedOrderData.map((item) => (
          <Card
            key={item.id}
            className={`mt-3 d-block d-lg-none ${styles.cardStyle}`}
          >
            <Card.Body>
              <span>Time</span>
              <p className="fw-normal">{item.Time}</p>
              <div className="row">
                <div className="col-6 col-sm-4 col-md-3">
                  <span>Type</span>
                  <p className="fw-normal">{item.Type}</p>
                </div>
                <div className="col-6 col-sm-4 col-md-3">
                  <span>Instrument</span>
                  <p className="fw-normal">{item.Instrument}</p>
                </div>
                <div className="col-6 col-sm-4 col-md-3">
                  <span>Product</span>
                  <p className="fw-normal">{item.Product}</p>
                </div>
                <div className="col-6 col-sm-4 col-md-3">
                  <span>Qty</span>
                  <p className="fw-normal">{item.Qty}</p>
                </div>
                <div className="col-6 col-sm-4 col-md-3">
                  <span>LTP</span>
                  <p className="fw-normal">{item.LTP}</p>
                </div>
                <div className="col-6 col-sm-4 col-md-3">
                  <span>Price</span>
                  <p className="fw-normal">{item.Price}</p>
                </div>
                <div className="col-6 col-sm-4 col-md-3">
                  <span>Status</span>
                  <p className="fw-normal">{item.Status}</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Col>
  )
}
