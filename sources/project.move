module MyModule::CryptoPriceTracker {
    use aptos_framework::signer;
    use aptos_framework::timestamp;
    
    /// Struct representing a crypto price entry
    struct PriceData has store, key {
        price: u64,           // Price in smallest unit (e.g., cents)
        last_updated: u64,    // Timestamp of last update
        symbol: vector<u8>,   // Crypto symbol (e.g., "BTC", "ETH")
    }
    
    /// Error codes
    const E_PRICE_DATA_NOT_EXISTS: u64 = 1;
    const E_INVALID_PRICE: u64 = 2;
    const E_UNAUTHORIZED_ORACLE: u64 = 3;
    
    /// Function to initialize price tracking for a cryptocurrency
    public fun initialize_price_tracker(
        owner: &signer, 
        symbol: vector<u8>, 
        initial_price: u64
    ) {
        let current_time = timestamp::now_seconds();
        
        let price_data = PriceData {
            price: initial_price,
            last_updated: current_time,
            symbol,
        };
        
        move_to(owner, price_data);
    }
    
    /// Function to update the price of a cryptocurrency
    public fun update_price(
        owner: &signer, 
        new_price: u64
    ) acquires PriceData {
        let owner_address = signer::address_of(owner);
        
        // Check if price data exists
        assert!(exists<PriceData>(owner_address), E_PRICE_DATA_NOT_EXISTS);
        assert!(new_price > 0, E_INVALID_PRICE);
        
        let price_data = borrow_global_mut<PriceData>(owner_address);
        let current_time = timestamp::now_seconds();
        
        // Update price and timestamp
        price_data.price = new_price;
        price_data.last_updated = current_time;
    }
    
    /// View function to get current price data (optional - for frontend integration)
    #[view]
    public fun get_price_data(tracker_address: address): (u64, u64, vector<u8>) acquires PriceData {
        assert!(exists<PriceData>(tracker_address), E_PRICE_DATA_NOT_EXISTS);
        
        let price_data = borrow_global<PriceData>(tracker_address);
        (price_data.price, price_data.last_updated, price_data.symbol)
    }
}