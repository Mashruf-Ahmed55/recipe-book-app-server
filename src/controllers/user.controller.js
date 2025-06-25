import userModel from '../models/user.model.js';

const createUser = async (request, response) => {
  try {
    const { name, email, photo_url, auth_type } = request.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return response.status(200).json({
        user: existingUser,
        message: 'User already exists',
      });
    }

    const user = await userModel.create({
      name,
      email,
      photo_url,
      auth_type,
    });

    response.status(201).json({
      user,
      message: 'User created successfully',
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Internal server error' });
  }
};

const loginUser = async (request, response) => {
  try {
    const { email } = request.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }
    response.status(200).json({ user, message: 'User logged in successfully' });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Internal server error' });
  }
};
const updateUser = async (request, response) => {
  try {
    const { id } = request.params;
    const { name, email, photo_url, password } = request.body;
    const user = await userModel.findByIdAndUpdate(
      id,
      { name, email, photo_url, password },
      { new: true }
    );
    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }
    response.status(200).json({ user, message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Internal server error' });
  }
};

const getMyProfile = async (request, response) => {
  try {
    const { id } = request.params;
    const user = await userModel.findById(id);
    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }
    response.status(200).json({ user, message: 'User found successfully' });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Internal server error' });
  }
};

export { createUser, getMyProfile, loginUser, updateUser };
