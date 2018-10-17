import * as actions from '.';
import * as types from './types';

describe('randomPhotoGet', () => {
  it('has correct type', () => {
    const action = actions.randomPhotoGet();
    expect(action.type).toEqual(types.RANDOM_PHOTO_GET);
  });
});

describe('randomPhotoSet', () => {
  it('has correct type', () => {
    const action = actions.randomPhotoSet();
    expect(action.type).toEqual(types.RANDOM_PHOTO_SET);
  });

  it('has correct payload', () => {
    const action = actions.randomPhotoSet({ id: 'photoId', url: 'http://wp.pl' });
    expect(action.payload).toEqual({
      photo: {
        id: 'photoId', url: 'http://wp.pl',
      },
    });
  });
});

describe('sectionGetMany', () => {
  it('has correct type', () => {
    const action = actions.sectionGetMany();
    expect(action.type).toEqual(types.SECTION_GET_MANY);
  });
});

describe('sectionSetMany', () => {
  it('has correct type', () => {
    const action = actions.sectionSetMany();
    expect(action.type).toEqual(types.SECTION_SET_MANY);
  });

  it('has correct payload', () => {
    const action = actions.sectionSetMany([
      { id: 'section1', title: 'Autumn' },
      { id: 'section2', url: 'Halloween' },
    ]);

    expect(action.payload).toEqual({
      sections: [
        { id: 'section1', title: 'Autumn' },
        { id: 'section2', url: 'Halloween' },
      ],
    });
  });
});

describe('sectionGet', () => {
  it('has correct type', () => {
    const action = actions.sectionGet();
    expect(action.type).toEqual(types.SECTION_GET);
  });

  it('has correct payload', () => {
    const action = actions.sectionGet(123);

    expect(action.payload).toEqual({ id: 123 });
  });
});

describe('sectionSet', () => {
  it('has correct type', () => {
    const action = actions.sectionSet();
    expect(action.type).toEqual(types.SECTION_SET);
  });

  it('has correct payload', () => {
    const action = actions.sectionSet({
      id: 123,
      title: 'Section title',
    });

    expect(action.payload).toEqual({
      section: {
        id: 123,
        title: 'Section title',
      },
    });
  });
});

describe('login', () => {
  it('has correct type', () => {
    const action = actions.login();
    expect(action.type).toEqual(types.LOGIN_IN_PROGRESS);
  });

  it('has correct payload', () => {
    const action = actions.login('email', 'password');

    expect(action.payload).toEqual({
      email: 'email',
      password: 'password',
    });
  });
});

describe('loggedInSet', () => {
  it('has correct type', () => {
    const action = actions.loggedInSet();
    expect(action.type).toEqual(types.LOGIN_SUCCESS);
  });

  it('has correct payload', () => {
    const action = actions.loggedInSet(true);

    expect(action.payload).toEqual({ loggedIn: true });
  });
});

describe('signup', () => {
  it('has correct type', () => {
    const action = actions.signup();
    expect(action.type).toEqual(types.SIGNUP_IN_PROGRESS);
  });

  it('has correct payload', () => {
    const action = actions.signup('email', 'password');

    expect(action.payload).toEqual({
      email: 'email',
      password: 'password',
    });
  });
});

describe('signedUpSet', () => {
  it('has correct type', () => {
    const action = actions.signedUpSet();
    expect(action.type).toEqual(types.SIGNEDUP_SET);
  });
});

describe('signUpConfirm', () => {
  it('has correct type', () => {
    const action = actions.signUpConfirm();
    expect(action.type).toEqual(types.SIGNUP_CONFIRM_IN_PROGRESS);
  });

  it('has correct payload', () => {
    const action = actions.signUpConfirm('email', 'code', 'password');

    expect(action.payload).toEqual({
      email: 'email',
      code: 'code',
      password: 'password',
    });
  });
});

describe('signUpConfirmed', () => {
  it('has correct type', () => {
    const action = actions.signUpConfirmed();
    expect(action.type).toEqual(types.SIGNUP_CONFIRMED);
  });
});
