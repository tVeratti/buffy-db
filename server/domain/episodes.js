const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;
const Episode = require('../models/episode');

const aggregation = userId => ({
  $project: {
    rating: {
      // Average rating (all)
      average: {
        $avg: {
          $map: {
            input: '$ratings',
            as: 'rating',
            in: '$$rating.value'
          }
        }
      },
      // Current user's rating
      user: {
        $reduce: {
          input: {
            $filter: {
              input: '$ratings',
              cond: { $eq: [userId, '$$this.user'] }
            }
          },
          initialValue: 0,
          in: '$$this.value'
        }
      },
      // Number of ratings
      count: { $size: '$ratings' }
    },
    // Include the rest of the properties...
    _id: 1,
    number: 1,
    title: 1,
    directed_by: 1,
    written_by: 1,
    story_by: 1,
    teleplay_by: 1,
    air_date: 1,
    use_viewers: 1,
    teaser: 1
  }
});

const all = userId => Episode.aggregate([aggregation(userId)]);

const one = (_id, user) =>
  Episode.aggregate([{ $match: { _id: ObjectId(_id) } }, aggregation(user)]);

const rate = (_id, user, value) =>
  Episode.findOne({ _id }).then(episode => {
    const ratings = episode.ratings.filter(e => e.user != user);
    episode.ratings = [...ratings, { user, value }];
    return episode.save();
  });

module.exports = { all, one, rate };
