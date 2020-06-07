import React from 'react'
import md5 from 'js-md5'

export default ({ user, width = "" }) => (
  <img
    src={
      "https://im0-tub-by.yandex.net/i?id=d1a9f80ccf303042a920d466960daaf1&n=13" +
      md5(user.email)
    }
    className="rounded-circle"
    alt={user.name}
    width={width}
  />
);
