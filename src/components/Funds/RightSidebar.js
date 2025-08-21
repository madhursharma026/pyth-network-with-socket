import { Col } from 'react-bootstrap'
import { CiCircleInfo, CiDroplet } from 'react-icons/ci'
import { FaCodiepie } from 'react-icons/fa6'
import { IoPieChartOutline } from 'react-icons/io5'
import styles from './RightSidebar.module.css'

export default function RightSidebar() {
  const equityItems = [
    { label: 'Available margin', value: '-00.00', isNegative: true },
    { label: 'Used margin', value: '0.00' },
    { label: 'Available cash', value: '-00.00', isNegative: true },
  ]

  const equityDetails = [
    { label: 'Opening balance', value: '-00.00' },
    { label: 'Payin', value: '0.00' },
    { label: 'Payout', value: '0.00' },
    { label: 'SPAN', value: '0.00' },
    { label: 'Delivery margin', value: '0.00' },
    { label: 'Exposure', value: '0.00' },
    { label: 'Options premium', value: '0.00' },
    { label: 'Collateral (Liquid funds)', value: '0.00' },
    { label: 'Collateral (Equity)', value: '0.00' },
    { label: 'Total collateral', value: '0.00' },
  ]

  const commodityItems = [
    { label: 'Available margin', value: '0.00' },
    { label: 'Used margin', value: '0.00' },
    { label: 'Available cash', value: '0.00' },
  ]

  const commodityDetails = [
    { label: 'Opening balance', value: '0.00' },
    { label: 'Payin', value: '0.00' },
    { label: 'Payout', value: '0.00' },
    { label: 'SPAN', value: '0.00' },
    { label: 'Delivery margin', value: '0.00' },
    { label: 'Exposure', value: '0.00' },
    { label: 'Options premium', value: '0.00' },
  ]
  return (
    <Col
      className={`px-4 py-3 rightSidebarScrollContainer ${styles.rightSidebarContainer} h-100`}
    >
      <div className={styles.rightColumn}>
        <div className="row">
          <div className="col-md-6 pt-4">
            <div className="row">
              <div className="col-sm-4 pt-sm-0 pt-3">
                <p
                  className={`fs-6 d-flex align-items-center gap-2 ${styles.textColor}`}
                >
                  <IoPieChartOutline className="fs-6" />
                  Equity
                </p>
              </div>
              <div className="col-sm-8 pt-sm-0 py-3 text-primary">
                <div className="text-sm-end mediumFontSize">
                  <FaCodiepie />
                  view statement &emsp;
                  <CiCircleInfo />
                  console
                </div>
              </div>
            </div>
            <div class={`card rounded-0 ${styles.cardDetails}`}>
              <div class="card-body fs-5">
                {equityItems.map((item) => (
                  <div className={styles.itemRow} key={item.label}>
                    <span className={styles.textColor}>{item.label}</span>
                    <span
                      className={`${
                        item.isNegative ? styles.negative : ''
                      } fs-4 ${styles.textColor}`}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}

                <hr className="my-3" />

                {equityDetails.map((item) => (
                  <div className={styles.itemRow} key={item.label}>
                    <span className={styles.textColor}>{item.label}</span>
                    <span className={styles.textColor}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-6 pt-4">
            <div className="row">
              <div className="col-sm-4 pt-sm-0 pt-3">
                <p
                  className={`fs-6 d-flex align-items-center gap-2 ${styles.textColor}`}
                >
                  <CiDroplet className="fs-6" />
                  commodity
                </p>
              </div>
              <div className="col-sm-8 pt-sm-0 py-3 text-primary">
                <div className="text-sm-end mediumFontSize">
                  <FaCodiepie />
                  view statement &emsp;
                  <CiCircleInfo />
                  console
                </div>
              </div>
            </div>
            <div class={`card rounded-0 ${styles.cardDetails}`}>
              <div class="card-body fs-5">
                {commodityItems.map((item) => (
                  <div className={styles.itemRow} key={item.label}>
                    <span className={styles.textColor}>{item.label}</span>
                    <span
                      className={`${
                        item.isNegative ? styles.negative : ''
                      } fs-4 ${styles.textColor}`}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}

                <hr className="my-3" />

                {commodityDetails.map((item) => (
                  <div className={styles.itemRow} key={item.label}>
                    <span className={styles.textColor}>{item.label}</span>
                    <span className={styles.textColor}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Col>
  )
}
