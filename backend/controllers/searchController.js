const Search = require("../models/Search");

const sortNumbers = async (req, res) => {
  const { numbers, order } = req.body;

  if (!Array.isArray(numbers)) {
    return res.status(400).json({ error: "Numbers should be an array." });
  }

  if (typeof order !== "string" || (order !== "asc" && order !== "desc")) {
    return res.status(400).json({ error: "Order should be 'asc' or 'desc'." });
  }

  try {
    const sortedNumbers =
      order === "desc"
        ? [...numbers].sort((a, b) => b - a)
        : [...numbers].sort((a, b) => a - b);

    const timestamp = Date.now();
    const searchPromises = numbers.map((num) =>
      new Search({ num, timestamp }).save()
    );
    await Promise.all(searchPromises);

    res.json({ sortedNumbers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const getFrequentNumbers = async (req, res) => {
  const n = parseInt(req.params.n);
  const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;

  try {
    const recentSearches = await Search.find({
      timestamp: { $gte: fiveMinutesAgo },
    });

    const frequencyMap = recentSearches.reduce((map, search) => {
      map[search.num] = (map[search.num] || 0) + 1;
      return map;
    }, {});

    const mostFrequent = Object.entries(frequencyMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, n)
      .map(([num, count]) => ({ number: parseInt(num), count }));

    res.json({ mostFrequent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { sortNumbers, getFrequentNumbers };
