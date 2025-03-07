import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { App } from './App'

function Root() {
  const isMobile = window.innerWidth < 768

  const commonLinkStyle = {
    position: 'absolute',
    fontSize: '1.1rem',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }

  const iconContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '300px',
    margin: '10px 0'
  }

  const commonImageStyle = {
    width: '100%',
    height: 'auto',
    maxWidth: '80px',
    objectFit: 'contain'
  }

  const desktopStyles = {
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none'
    },
    pumpFun: {
      ...commonLinkStyle,
      bottom: 100,
      left: 20,
      textAlign: 'center',
      fontSize: '2rem'
    },
    telegram: {
      ...commonLinkStyle,
      bottom: 100,
      right: 20,
      fontSize: '2.1rem',
      textAlign: 'center'
    },
    title: {
      width: '100%',
      position: 'absolute',
      top: 20,
      fontSize: '4rem',
      color: 'white',
      textAlign: 'center',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }

  const mobileStyles = {
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none'
    },
    pumpFun: {
      ...commonLinkStyle,
      bottom: 60,
      left: 10,
      fontSize: '0.8rem',
      textAlign: 'center'
    },
    telegram: {
      ...commonLinkStyle,
      bottom: 60,
      right: 10,
      fontSize: '0.8rem',
      textAlign: 'center'
    },
    title: {
      width: '100%',
      position: 'absolute',
      top: 10,
      fontSize: '2rem',
      color: 'white',
      textAlign: 'center',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }

  const styles = isMobile ? mobileStyles : desktopStyles

  return (
    <>
      <App />
      <div className="press-start-2p-regular" style={styles.container}>
        <a className="press-start-2p-regular pumpFun" href="https://pump.fun/" style={styles.pumpFun}>
          <div style={iconContainerStyle}>
    <a href="https://pump.fun/V7hNqStNAGWeEvieq3ChPt4pfqf5HMd3o2bPxeDpump">
            <img className="icon-image" src="./pump.png" alt="PUMP.FUN" style={commonImageStyle} /></a>
    
            <img className="icon-image" src="./tools.png" alt="Tools" style={commonImageStyle} />
    <a href="https://x.com/SnapshotsSolana">
            <img className="icon-image" src="./x.png" alt="File" style={commonImageStyle} />
    </a>
          </div>
        </a>
        <div style={styles.telegram}>
          <a className="press-start-2p-regular" href="https://t.me/SnapshotsInTimePortal" style={{ color: 'white' }}>
            <div style={iconContainerStyle}>
              <a href="https://t.me/SnapshotsInTimePortal">
              <img className="icon-image" src="./Telegram.png" alt="Telegram" style={commonImageStyle} /></a>
  
              <img className="icon-image" src="./dex.png" alt="DEX" style={commonImageStyle} />
              <img className="icon-image" src="./jup.png" alt="DEX" style={commonImageStyle} />

            </div>

          </a>
        </div>
        <a className="snapshots-title" style={styles.title} href="#">
          Snapshots in Time
        </a>
      </div>
    </>
  )
}

createRoot(document.getElementById('root')).render(<Root />)
