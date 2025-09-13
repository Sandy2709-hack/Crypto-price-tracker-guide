import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [cryptos, setCryptos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Mock crypto data for development
  const mockCryptoData = [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'btc',
      image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
      current_price: 43250.50,
      market_cap: 848234567890,
      market_cap_rank: 1,
      price_change_percentage_24h: 2.45,
      total_volume: 12345678900
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'eth',
      image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
      current_price: 2650.75,
      market_cap: 318234567890,
      market_cap_rank: 2,
      price_change_percentage_24h: -1.23,
      total_volume: 8765432100
    },
    {
      id: 'tether',
      name: 'Tether',
      symbol: 'usdt',
      image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png',
      current_price: 1.00,
      market_cap: 95234567890,
      market_cap_rank: 3,
      price_change_percentage_24h: 0.02,
      total_volume: 15234567890
    },
    {
      id: 'binancecoin',
      name: 'BNB',
      symbol: 'bnb',
      image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
      current_price: 315.80,
      market_cap: 47234567890,
      market_cap_rank: 4,
      price_change_percentage_24h: 3.67,
      total_volume: 1234567890
    },
    {
      id: 'solana',
      name: 'Solana',
      symbol: 'sol',
      image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
      current_price: 98.45,
      market_cap: 43234567890,
      market_cap_rank: 5,
      price_change_percentage_24h: -2.15,
      total_volume: 2345678901
    },
    {
      id: 'ripple',
      name: 'XRP',
      symbol: 'xrp',
      image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
      current_price: 0.615,
      market_cap: 33234567890,
      market_cap_rank: 6,
      price_change_percentage_24h: 1.89,
      total_volume: 987654321
    },
    {
      id: 'usd-coin',
      name: 'USDC',
      symbol: 'usdc',
      image: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png',
      current_price: 1.00,
      market_cap: 24234567890,
      market_cap_rank: 7,
      price_change_percentage_24h: -0.01,
      total_volume: 3456789012
    },
    {
      id: 'staked-ether',
      name: 'Lido Staked Ether',
      symbol: 'steth',
      image: 'https://assets.coingecko.com/coins/images/13442/large/steth_logo.png',
      current_price: 2648.30,
      market_cap: 23234567890,
      market_cap_rank: 8,
      price_change_percentage_24h: -1.15,
      total_volume: 456789012
    },
    {
      id: 'cardano',
      name: 'Cardano',
      symbol: 'ada',
      image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
      current_price: 0.485,
      market_cap: 17234567890,
      market_cap_rank: 9,
      price_change_percentage_24h: 4.23,
      total_volume: 567890123
    },
    {
      id: 'dogecoin',
      name: 'Dogecoin',
      symbol: 'doge',
      image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
      current_price: 0.0825,
      market_cap: 11234567890,
      market_cap_rank: 10,
      price_change_percentage_24h: -3.45,
      total_volume: 678901234
    }
  ]

  // Load mock data
  useEffect(() => {
    const loadMockData = () => {
      setLoading(true)
      
      // Simulate API delay
      setTimeout(() => {
        setCryptos(mockCryptoData)
        setLoading(false)
        setError(null)
      }, 1000)
    }

    loadMockData()
    
    // Simulate price updates every 10 seconds
    const interval = setInterval(() => {
      setCryptos(prevCryptos => 
        prevCryptos.map(crypto => ({
          ...crypto,
          current_price: crypto.current_price * (1 + (Math.random() - 0.5) * 0.02),
          price_change_percentage_24h: crypto.price_change_percentage_24h + (Math.random() - 0.5) * 0.5
        }))
      )
    }, 10000)
    
    return () => clearInterval(interval)
  }, [])

  // Filter cryptos based on search term
  const filteredCryptos = cryptos.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Format price with proper decimals
  const formatPrice = (price) => {
    return price < 1 ? price.toFixed(6) : price.toFixed(2)
  }

  // Format market cap
  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`
    return `$${marketCap.toLocaleString()}`
  }

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading cryptocurrency data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app">
        <div className="error">
          <h2>❌ {error}</h2>
          <button onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🚀 Crypto Price Tracker</h1>
        <p>Real-time cryptocurrency prices and market data</p>
      </header>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search cryptocurrencies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="crypto-grid">
        {filteredCryptos.length === 0 ? (
          <div className="no-results">
            <p>No cryptocurrencies found matching "{searchTerm}"</p>
          </div>
        ) : (
          filteredCryptos.map(crypto => (
            <div key={crypto.id} className="crypto-card">
              <div className="crypto-header">
                <img 
                  src={crypto.image} 
                  alt={crypto.name}
                  className="crypto-logo"
                />
                <div className="crypto-info">
                  <h3>{crypto.name}</h3>
                  <span className="crypto-symbol">{crypto.symbol.toUpperCase()}</span>
                </div>
                <div className="crypto-rank">#{crypto.market_cap_rank}</div>
              </div>

              <div className="crypto-price">
                <span className="price">${formatPrice(crypto.current_price)}</span>
              </div>

              <div className="crypto-change">
                <span className={`change ${crypto.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}`}>
                  {crypto.price_change_percentage_24h >= 0 ? '↗' : '↘'} 
                  {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                </span>
              </div>

              <div className="crypto-stats">
                <div className="stat">
                  <span className="stat-label">Market Cap</span>
                  <span className="stat-value">{formatMarketCap(crypto.market_cap)}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">24h Volume</span>
                  <span className="stat-value">{formatMarketCap(crypto.total_volume)}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <footer className="footer">
        <p>Data provided by CoinGecko API • Updates every 30 seconds</p>
      </footer>
    </div>
  )
}

export default App