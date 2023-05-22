import Map from './block/Map'
import Header from './components/Header'
import Version from './block/Version'
import Country from './block/Country'
import OnlineNode from './block/OnlineNode'
import styles from './page.module.css'

export default function Home() {
  return <>
    <Header />
    <main className={styles.main}>
      <OnlineNode />
      <Map />
      <div>
        <Country />
        <Version />
      </div>
    </main>
  </>
}
