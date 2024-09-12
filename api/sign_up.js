import express from 'express';
import Item from '../schemas/item.schema.js';
import Joi from 'joi';

const router = express.Router();

// 할 일 생성 API의 요청 데이터 검증을 위한 Joi 스키마를 정의합니다.
const createItemSchema = Joi.object({
  password: Joi.string().min(6).required(),
  passwordchack: Joi.string(),
});

// const existUsername = await getConnection()
//   .getRepository(User)
//   .findOne({ where: { username } });
// if (existUsername) {
//   return res.status(400).send({ message: '이미 존재하는 닉네임입니다' });
// }

/* 회원가입 API post*/
/** 에러 핸들러 **/
router.post('/todos', async (req, res, next) => {
  try {
    // 클라이언트에게 전달받은 데이터를 검증합니다.
    const validateBody = await createItemSchema.validateAsync(req.body);

    // 클라이언트에게 전달받은 value 데이터를 변수에 저장합니다.
    const { password } = validateBody;

    // Todo모델을 사용해, MongoDB에서 'order' 값이 가장 높은 '해야할 일'을 찾습니다.
    const itemMaxOrder = await Item.findOne().sort('-order').exec();

    // 'order' 값이 가장 높은 도큐멘트의 1을 추가하거나 없다면, 1을 할당합니다.
    const order = itemMaxOrder ? itemMaxOrder.order + 1 : 1;

    // Todo모델을 이용해, 새로운 '해야할 일'을 생성합니다.
    const item = new Item({ password, order });

    // 생성한 '해야할 일'을 MongoDB에 저장합니다.
    await item.save();

    return res.status(201).json({ item });
  } catch (error) {
    // 발생한 에러를 다음 에러 처리 미들웨어로 전달합니다.
    next(error);
  }
});
/* 로그인 API post*/
/* 캐릭터 생성 API post*/
/* 캐릭터 삭제 API delete*/
/* 캐릭터 상세 조회 API get*/
/* 아이템 생성 API post*/
/* 아이템 수정 API put*/
/* 아이템 목록 조회 API get*/
/* 아이템 상세 조회 API get*/
