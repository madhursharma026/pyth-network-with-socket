import { useEffect, useState } from 'react'
import { Button, Col } from 'react-bootstrap'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { CiDroplet } from 'react-icons/ci'
import { IoBagHandleOutline, IoPieChartOutline } from 'react-icons/io5'
import { MdAutoGraph } from 'react-icons/md'
import { PiChartDonutLight } from 'react-icons/pi'
import styles from './RightSidebar.module.css'

export default function RightSidebar() {
  const [height, setHeight] = useState('100%')

  useEffect(() => {
    const savedHeight = localStorage.getItem('screenHeight')
    if (savedHeight) {
      setHeight(savedHeight + 'px')
    }
  }, [])
  return (
    <Col
      className={`px-4 py-3 rightSidebarScrollContainer ${styles.rightSidebarContainer}`}
    >
      <div className={styles.rightColumn}>
        <p className="fs-4">Hi, Madhur</p>
        <hr style={{ color: '#dad0d0' }} />
        <div className="row">
          <div className="col-md-6 row">
            <p
              className={`fs-5 mb-0 d-flex align-items-center gap-2 ${styles.textColor}`}
            >
              <IoPieChartOutline className="fs-4" />
              Equity
            </p>
            <div className={`col-sm-5 col-12  ${styles.borderEndOnlySm}`}>
              <span className="fs-1 fw-light d-block">-00.0</span>
              <span className={`${styles.textColor} mediumFontSize`}>
                Margin available
              </span>
            </div>
            <div className="col-sm-6 col-12 offset-sm-1 mt-sm-0 mt-3">
              <span
                className={`${styles.textColor} mediumFontSize d-block mt-2`}
              >
                Margins used 0
              </span>
              <span
                className={`${styles.textColor} mediumFontSize d-block mt-2`}
              >
                Opening balance -00.0
              </span>
              <span className="mediumFontSize text-primary d-block mt-2">
                <PiChartDonutLight />
                View statement
              </span>
            </div>
          </div>
          <div className="col-md-6 row mt-sm-0 mt-5">
            <p className={`fs-5 ${styles.textColor}`}>
              <CiDroplet className="fs-4" />
              Commodity
            </p>
            <div className={`col-sm-5 col-12  ${styles.borderEndOnlySm}`}>
              <span className="fs-1 fw-light d-block">0</span>
              <span className={`${styles.textColor} mediumFontSize`}>
                Margin available
              </span>
            </div>
            <div className="col-sm-6 col-12 offset-sm-1 mt-sm-0 mt-3">
              <span
                className={`${styles.textColor} mediumFontSize d-block mt-2`}
              >
                Margins used 0
              </span>
              <span
                className={`${styles.textColor} mediumFontSize d-block mt-2`}
              >
                Opening balance -00.0
              </span>
              <span className="mediumFontSize text-primary d-block mt-2">
                <PiChartDonutLight />
                View statement
              </span>
            </div>
          </div>
        </div>
        <br />
        <hr style={{ color: '#dad0d0' }} />

        <div className="row g-4 py-2">
          <p
            className={`fs-5 mb-0 d-flex align-items-center gap-2 ${styles.textColor}`}
          >
            <IoBagHandleOutline className="fs-4" />
            Holdings (1)
          </p>
          <div className={`col-md-4  ${styles.borderEndOnlySm}`}>
            <span className="fs-1 text-danger">
              -00.00k <span className="mediumFontSize">-0.00%</span>
            </span>
          </div>
          <div className="col-md-4 px-4">
            <spam className={`${styles.textColor}`}>Current value</spam> &emsp;
            0.00L
            <br />
            <spam className={`${styles.textColor}`}>Investment</spam> &emsp;
            0.00L
          </div>
          <div className="col-md-4"></div>
          <div className="col-md-9">
            <ProgressBar
              now={100}
              className="rounded-0"
              style={{ height: '50px' }}
            />
          </div>
          <div className="col-md-3"></div>
          <h5 className={`${styles.textColor}`}>₹0,00,000.00</h5>
        </div>
        <hr style={{ color: '#dad0d0' }} />
        <br />
        <p
          className={`fs-5 mb-0 d-flex align-items-center gap-2 ${styles.textColor}`}
        >
          <MdAutoGraph className="fs-4" />
          Market overview
        </p>
        <div className="row">
          <div className="col-xl-7 col-md-8">
            <img
              src="chart.png"
              alt="#ImgNotFound"
              className={`img-fluid w-100 ${styles.imgLightChart}`}
            />
            <img
              src="chartDark.png"
              alt="#ImgNotFound"
              className={`img-fluid w-100 ${styles.imgDarkChart}`}
            />
          </div>
          <div className="col-xl-5 col-md-4 text-center">
            <img
              src="https://kite.zerodha.com/static/images/illustrations/positions.svg"
              alt="#ImgNotFound"
              style={{ maxWidth: '100px' }}
            />
            <p className={`${styles.textColor}`}>
              You don't have any positions yet
            </p>
            <Button variant="primary">Get Started</Button>
          </div>
        </div>
        <hr style={{ color: '#dad0d0' }} />
      </div>
    </Col>
  )
}
