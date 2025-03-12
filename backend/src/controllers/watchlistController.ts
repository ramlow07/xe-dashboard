import type { Request, Response } from "express";
import axios from "axios";

// to store in memory
const watchlists: Record<string, Watchlist> = {};
let nextId = 1;

interface Watchlist {
  id: string;
  name: string;
  coins: string[]; // CoinGecko IDs like "bitcoin", "ethereum"
  createdAt: Date;
}

export const createWatchlist = async (req: Request, res: Response) => {
  try {
    const { name, coins = [] } = req.body;
    const id = String(nextId++);

    watchlists[id] = {
      id,
      name,
      coins,
      createdAt: new Date(),
    };

    res.status(201).json(watchlists[id]);
  } catch (error) {
    res.status(500).json({ error: "Failed to create watchlist" });
  }
};

// get all watchlists
export const getWatchlist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const watchlist = watchlists[id];

    if (!watchlist) {
      return res.status(404).json({ error: "Watchlist not found" });
    }

    if (watchlist.coins.length === 0) {
      return res.status(200).json({ ...watchlist, prices: [] });
    }

    const coinIds = watchlist.coins.join(",");
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd`
    );

    const prices = watchlist.coins.map((coin) => ({
      id: coin,
      price: response.data[coin]?.usd || null,
    }));

    res.status(200).json({ ...watchlist, prices });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve watchlist data" });
  }
};

export const updateWatchlist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, coins } = req.body;

    if (!watchlists[id]) {
      return res.status(404).json({ error: "Watchlist not found" });
    }

    if (name) watchlists[id].name = name;
    if (coins) watchlists[id].coins = coins;

    res.status(200).json(watchlists[id]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update watchlist" });
  }
};

export const deleteWatchlist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!watchlists[id]) {
      return res.status(404).json({ error: "Watchlist not found" });
    }

    delete watchlists[id];
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete watchlist" });
  }
};

export const listWatchlists = async (req: Request, res: Response) => {
  try {
    const watchlistArray = Object.values(watchlists);
    res.status(200).json(watchlistArray);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve watchlists" });
  }
};
