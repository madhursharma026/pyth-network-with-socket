import { Card, Col, Table } from 'react-bootstrap'
import styles from './RightSidebar.module.css'

export default function RightSidebar() {
  const positionsData = Array.from({ length: 4 }).map((_, i) => ({
    id: i,
    Product: 'XXXX',
    Instrument: 'XXXX XXXX XXXX XXXX',
    Qty: '-0',
    Avg: '0000.00',
    LTP: '0000.00',
    pnl: '-00.00',
    Chg: '0.00%',
  }))
  return (
    <Col
      className={`px-4 py-3 rightSidebarScrollContainer ${styles.rightSidebarContainer} h-100`}
    >
      <div className={styles.rightColumn}>
        <p className="fs-5 pt-3">Positions (4)</p>

        <Table className={`d-none d-lg-table ${styles.tableStyle}`} hover>
          <thead>
            <tr className="mediumFontSize">
              <th className={`${styles.textColor} fw-normal`}>#</th>
              <th className={`${styles.textColor} fw-normal`}>Products</th>
              <th className={`${styles.textColor} fw-normal`}>Instrument</th>
              <th className={`${styles.textColor} fw-normal`}>Qty.</th>
              <th className={`${styles.textColor} fw-normal`}>Avg</th>
              <th className={`${styles.textColor} fw-normal`}>LTP</th>
              <th className={`${styles.textColor} fw-normal`}>P&L</th>
              <th className={`${styles.textColor} fw-normal`}>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {positionsData.map((item) => (
              <tr key={item.id} className="mediumFontSize">
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  <span
                    className="px-2 py-1"
                    style={{ background: '#ECF2FD', color: '#121212' }}
                  >
                    {item.Product}
                  </span>
                </td>
                <td>{item.Instrument}</td>
                <td className="text-success">{item.Qty}</td>
                <td>{item.Avg}</td>
                <td>{item.LTP}</td>
                <td className="text-success">{item.pnl}</td>
                <td>{item.Chg}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        {positionsData.map((item) => (
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
