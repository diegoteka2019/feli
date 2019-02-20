import { TestBed, async } from '@angular/core/testing';
import { PATTERNS } from '@app/constants/patterns';


describe('Patterns - Color', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
    }).compileComponents();
  }));

  it("Valid color", async(() => {
      let testSubject = PATTERNS.colorHexa.test("AAA222");
      expect(testSubject).toBeTruthy();
  }));

  it("Invalid color - invalid char at start", async(() => {
      let testSubject = PATTERNS.colorHexa.test("zaa222");
      expect(testSubject).toBeFalsy();
  }));

  it("Invalid color - invalid char at end", async(() => {
      let testSubject = PATTERNS.colorHexa.test("22233z");
      expect(testSubject).toBeFalsy();
  }));

  it("Invalid color - invalid char at middle", async(() => {
      let testSubject = PATTERNS.colorHexa.test("222z33");
      expect(testSubject).toBeFalsy();
  }));

  it("Invalid color - less chars than allowed", async(() => {
      let testSubject = PATTERNS.colorHexa.test("AA222");
      expect(testSubject).toBeFalsy();
  }));

  it("Invalid color - more chars than allowed", async(() => {
      let testSubject = PATTERNS.colorHexa.test("AAAAAAA");
      expect(testSubject).toBeFalsy();
  }));

});

describe('Patterns - Hexa', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
    }).compileComponents();
  }));

  it("Valid Hexa", async(() => {
      let testSubject1 = PATTERNS.hexa.test("A");
      let testSubject2 = PATTERNS.hexa.test("a");
      let testSubject3 = PATTERNS.hexa.test("b");
      let testSubject4 = PATTERNS.hexa.test("c");
      expect(testSubject1).toBeTruthy();
      expect(testSubject2).toBeTruthy();
      expect(testSubject3).toBeTruthy();
      expect(testSubject4).toBeTruthy();
  }));

  it("Invalid Hexa - invalid char at start", async(() => {
      let testSubject = PATTERNS.hexa.test("za22");
      expect(testSubject).toBeFalsy();
  }));

  it("Invalid Hexa - invalid char at end", async(() => {
      let testSubject = PATTERNS.hexa.test("233z");
      expect(testSubject).toBeFalsy();
  }));

  it("Invalid Hexa - invalid char at middle", async(() => {
      let testSubject = PATTERNS.hexa.test("22z33");
      expect(testSubject).toBeFalsy();
  }));

});

describe('Patterns - string', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
    }).compileComponents();
  }));


  it("Valid string", async(() => {
    let testSubject = PATTERNS.string.test("záéíóúñÑ");
    expect(testSubject).toBeTruthy();
  }));

  it("Invalid string - Has numbers at start", async(() => {
    let testSubject = PATTERNS.string.test("1záéíóúùñÑ");
    expect(testSubject).toBeFalsy();
}));

it("Invalid string - Has numbers at end", async(() => {
    let testSubject = PATTERNS.string.test("záéíóúùñÑ1");
    expect(testSubject).toBeFalsy();
}));

it("Invalid string - Has numbers at middle", async(() => {
    let testSubject = PATTERNS.string.test("záéíóúù1ñÑ");
    expect(testSubject).toBeFalsy();
}));

it("Invalid string - Has special char at start", async(() => {
    let testSubject = PATTERNS.string.test("-áéíóúùñÑ");
    expect(testSubject).toBeFalsy();
}));

it("Invalid string - Has special char at end", async(() => {
    let testSubject = PATTERNS.string.test("áéíóúùñÑ-");
    expect(testSubject).toBeFalsy();
  }));

it("Invalid string - Has special char at middle", async(() => {
    let testSubject = PATTERNS.string.test("áéíóú-ùñÑ");
    expect(testSubject).toBeFalsy();
  }));


});

describe('Patterns - number', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
    }).compileComponents();
  }));


  it("Valid number", async(() => {
    let testSubject = PATTERNS.number.test("13213123");
    expect(testSubject).toBeTruthy();
}));

it("Invalid number - Has letters at start", async(() => {
    let testSubject = PATTERNS.number.test("z123456789");
    expect(testSubject).toBeFalsy();
}));

it("Invalid number - Has letters at end", async(() => {
    let testSubject = PATTERNS.number.test("123456789z");
    expect(testSubject).toBeFalsy();
}));

it("Invalid number - Has letters at middle", async(() => {
    let testSubject = PATTERNS.number.test("123456z789");
    expect(testSubject).toBeFalsy();
}));

it("Invalid number - Has special char at start", async(() => {
    let testSubject = PATTERNS.number.test("-123");
    expect(testSubject).toBeFalsy();
  }));

it("Invalid number - Has special char at end", async(() => {
    let testSubject = PATTERNS.number.test("123-");
    expect(testSubject).toBeFalsy();
  }));

it("Invalid number - Has special char at middle", async(() => {
    let testSubject = PATTERNS.number.test("12-3");
    expect(testSubject).toBeFalsy();
  }));


});
