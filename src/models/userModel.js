const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '이름을 입력해 주세요!']
  },
  email: {
    type: String,
    required: [true, '이메일을 입력해주세요!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, '다시 입력해주세요']
  },
  password: {
    type: String,
    required: [true, '패스워드를 입력해주세요'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, '패스워드를 확인해주세요'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: '입력한 패스워드와 다릅니다'
    }
  },
  passwordChangedAt: Date,
  money: {
    type: Number,
    required: [true, '돈을 입금해주세요'],
    min: [0, '최소금액은 0원입니다']
  },
  sniper: {
    type: mongoose.Schema.ObjectId,
    ref: 'Sniper'
  }
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
