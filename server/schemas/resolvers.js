const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({
                    $or: [{ _id: context.user._id}, { username: context.user.username }],
                  })
                  .select('-__v -password')
                  .populate('savedBooks');
                
                return userData;
            }

            throw new AuthenticationError('Not logged in!');
        }
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Please check email!');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect Password');
            }

            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        saveBook: async (parent, args, context) => {
            if (context.user) {
                const updatedUserData = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: { ...args } } },
                    { new: true, runValidators: true}
                );
                return updatedUserData;
            }
            
            throw new AuthenticationError("You need to be logged in!");
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUserData = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: params.bookId } } },
                    { new: true }
                );
                
                return updatedUserData;
            }

            throw new AuthenticationError("You need to be logged in!");
        }
    }
};

module.exports = resolvers;