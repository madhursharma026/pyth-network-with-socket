import Tabs from '@/components/Tabs/Tabs'
import { Card, Col, Form, InputGroup, ProgressBar, Row } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import { CiLock } from 'react-icons/ci'
import { FaUsers } from 'react-icons/fa'
import { LiaChartPieSolid } from 'react-icons/lia'
import { MdDownload } from 'react-icons/md'
import { SlMagnifier } from 'react-icons/sl'
import styles from './RightSidebar.module.css'

export default function RightSidebar() {
  const holdingData = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    instrument: 'XXXXXXXXXX',
    qty: '0000',
    avgCost: '000.00',
    ltp: '000.00',
    invested: '0,00,000.00',
    currentVal: '0,00,000.00',
    pnl: '-00,000.00',
    netChg: '-0.00%',
    dayChg: '+0.00%',
    pnlColor: 'text-danger',
    netChgColor: 'text-danger',
    dayChgColor: 'text-success',
  }))

  return (
    <Col
      className={`px-4 py-3 rightSidebarScrollContainer ${styles.rightSidebarContainer} h-100`}
    >
      <div className={styles.rightColumn}>
        <Tabs
          tabsName={['All', 'Equity', 'Mutual funds']}
          activeTab={'Equity'}
        />

        <div
          className={`d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center my-3 gap-3 ${styles.responsiveContainer}`}
        >
          {/* Left: Holdings and Filter Dropdown */}
          <div className="d-flex align-items-center flex-wrap gap-2">
            <span className={styles.fs6Text}>Holdings (1)</span>
            <Form.Select className={styles.filterSelect}>
              <option>All Equity</option>
              <option value="1">MFT</option>
              <option value="2">Kite Only</option>
              <option value="3">Smallcase</option>
            </Form.Select>
          </div>

          {/* Right: Search + Icons */}
          <div className="d-flex align-items-center flex-wrap gap-2">
            <InputGroup className={`${styles.searchGroup} d-sm-flex d-none`}>
              <InputGroup.Text className={styles.inputGroupText}>
                <SlMagnifier />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search"
                className={styles.searchInput}
                aria-label="Search"
              />
            </InputGroup>

            <span
              className={`d-flex align-items-center text-primary gap-1 mediumFontSize ${styles.iconLink}`}
            >
              <CiLock /> Authorisation
            </span>
            <span
              className={`d-flex align-items-center text-primary gap-1 mediumFontSize ${styles.iconLink}`}
            >
              <FaUsers /> Family
            </span>
            <span
              className={`d-flex align-items-center text-primary gap-1 mediumFontSize ${styles.iconLink}`}
            >
              <LiaChartPieSolid /> Analytics
            </span>
            <span
              className={`d-flex align-items-center text-primary gap-1 mediumFontSize ${styles.iconLink}`}
            >
              <MdDownload /> Download
            </span>
          </div>
        </div>

        <hr className={styles.divider} />

        <Row className="py-3 text-muted">
          <Col md={3} xs={6}>
            <div className={styles.metricBox}>
              <span className={styles.label}>Total investment</span>
              <h5 className={`${styles.value} ${styles.textColor}`}>
                ₹0,00,000
              </h5>
            </div>
          </Col>
          <Col md={3} xs={6}>
            <div className={styles.metricBox}>
              <span className={styles.label}>Current value</span>
              <h5 className={`${styles.value} ${styles.textColor}`}>
                ₹0,00,000
              </h5>
            </div>
          </Col>
          <Col md={3} xs={6}>
            <div className={styles.metricBox}>
              <span className={styles.label}>Day&apos;s P&amp;L</span>
              <h5 className={`${styles.value} text-success`}>
                ₹00,000 <span className={`${styles.subValue}`}>(-0.00%)</span>
              </h5>
            </div>
          </Col>
          <Col md={3} xs={6}>
            <div className={styles.metricBox}>
              <span className={styles.label}>Total P&amp;L</span>
              <h5 className={`${styles.value} text-success`}>
                ₹00,000.00{' '}
                <span className={`${styles.subValue}`}>(-0.00%)</span>
              </h5>
            </div>
          </Col>
        </Row>

        <hr className={styles.divider} />

        <Table className={`d-none d-lg-table ${styles.tableStyle}`} hover>
          <thead>
            <tr className="mediumFontSize">
              <th className={`${styles.textColor} fw-normal`}>Instrument</th>
              <th className={`${styles.textColor} fw-normal`}>Qty.</th>
              <th className={`${styles.textColor} fw-normal`}>Avg. cost</th>
              <th className={`${styles.textColor} fw-normal`}>LTP</th>
              <th className={`${styles.textColor} fw-normal`}>Invested</th>
              <th className={`${styles.textColor} fw-normal`}>Cur. val</th>
              <th className={`${styles.textColor} fw-normal`}>P&L</th>
              <th className={`${styles.textColor} fw-normal`}>Net chg.</th>
              <th className={`${styles.textColor} fw-normal`}>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {holdingData.map((item) => (
              <tr key={item.id} className="mediumFontSize">
                <td>{item.instrument}</td>
                <td>{item.qty}</td>
                <td>{item.avgCost}</td>
                <td>{item.ltp}</td>
                <td>{item.invested}</td>
                <td>{item.currentVal}</td>
                <td className={item.pnlColor}>{item.pnl}</td>
                <td className={item.netChgColor}>{item.netChg}</td>
                <td className={item.dayChgColor}>{item.dayChg}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        {holdingData.map((item) => (
          <Card
            key={item.id}
            className={`mt-3 d-block d-lg-none ${styles.cardStyle}`}
          >
            <Card.Body>
              <span>Instrument</span>
              <p className="fw-normal">{item.instrument}</p>
              <div className="row">
                <div className="col-6 col-sm-4 col-md-3">
                  <span>Qty.</span>
                  <p className="fw-normal">{item.qty}</p>
                </div>
                <div className="col-6 col-sm-4 col-md-3">
                  <span>Avg. cost</span>
                  <p className="fw-normal">{item.avgCost}</p>
                </div>
                <div className="col-6 col-sm-4 col-md-3">
                  <span>LTP</span>
                  <p className="fw-normal">{item.ltp}</p>
                </div>
                <div className="col-6 col-sm-4 col-md-3">
                  <span>Invested</span>
                  <p className="fw-normal">{item.invested}</p>
                </div>
                <div className="col-6 col-sm-4 col-md-3">
                  <span>Cur. Val</span>
                  <p className="fw-normal">{item.currentVal}</p>
                </div>
                <div className="col-6 col-sm-4 col-md-3">
                  <span>P&L</span>
                  <p className={`fw-normal ${item.pnlColor}`}>{item.pnl}</p>
                </div>
                <div className="col-6 col-sm-4 col-md-3">
                  <span>Net Charg.</span>
                  <p className={`fw-normal ${item.netChgColor}`}>
                    {item.netChg}
                  </p>
                </div>
                <div className="col-6 col-sm-4 col-md-3">
                  <span>Day Chang.</span>
                  <p className={`fw-normal ${item.dayChgColor}`}>
                    {item.dayChg}
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}

        <Card className={`mt-3 d-block d-lg-none ${styles.cardStyle}`}>
          <Card.Body>
            <div className="row">
              <div className="col-sm col-6">
                <span>Invested</span>
                <p className="fw-normal">0,00,000.00</p>
              </div>
              <div className="col-sm col-6">
                <span>Total</span>
                <p className="fw-normal">0,00,000.00</p>
              </div>
              <div className="col-sm col-6">
                <span>P&L</span>
                <p className="fw-normal text-danger">-00,000.00</p>
              </div>
              <div className="col-sm col-6">
                <span>Net Chg.</span>
                <p className="fw-normal">-0.00%</p>
              </div>
              <div className="col-sm col-6">
                <span>Day Chg.</span>
                <p className="fw-normal">-0.00%</p>
              </div>
            </div>
          </Card.Body>
        </Card>

        <ProgressBar
          now={100}
          className="rounded-0 mt-4"
          style={{ height: '70px' }}
        />
        <div className="row">
          <div className="col-md-4 mt-md-0 mt-3">
            <p className="fs-4 fw-normal">₹0,00,000.00</p>
          </div>
          <div className="col-md-8 text-md-end">
            <span className="mx-2">
              <input type="checkbox" className="mx-1" />
              Current value
            </span>
            <span className="mx-2">
              <input type="checkbox" className="mx-1" />
              Investment value
            </span>
            <span className="mx-2">
              <input type="checkbox" className="mx-1" />
              P&L
            </span>
          </div>
        </div>
      </div>
    </Col>
  )
}
