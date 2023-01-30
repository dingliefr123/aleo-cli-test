// Carry out proces tests, by simulating the readl command-line-iterface calling
import { execSync } from 'node:child_process';
import { CommandEnum } from '../src/typing';
import {
  HELP_MESSAGE_TXT_EN,
  INPUT_ERROR_EN,
  INPUT_ERROR_FR,
  NONE_FOUND_TXT
} from '../src/consts';
import { CountResType, ExecCbkType, ExtractFunRetType, PatternResType } from './typing';
import { RightCountRes, RyPatternRes } from './consts';

const CLI_CALL_PREFIX = 'node app';
function formatCommand(parameter: string) {
  return `${CLI_CALL_PREFIX} ${parameter}`;
}
/**
 * Execute the exec command, provided by node runtime,
 * it could handle the execution error automatically
 * the **command** will be foratted with executable npm command,
 * and **cbk** will return the **stdout** and **stdErr**
*/
function execCall(command: string, cbk: ExecCbkType) {
  // exec(formatCommand(command), (err, out, stdErr) => {
  //   if (err)
  //     expect(false).toBeTruthy(),
  //     doneOnErr();
  //   cbk(out, stdErr);
  // });
  const stdout = execSync(formatCommand(command));
  cbk(stdout.toString(), '');
}

describe('test helping messages could display properly', () => {
  it("when invalid parameter 'help', error messages should be returnded", done => {
    execCall(
      CommandEnum.HELP,
      stdout => { expect(stdout).toMatch(INPUT_ERROR_EN), done(); }
    );
  });

  it("when invalid parameter '' empty string, error messages should be returnded", done => {
    execCall(
      '',
      stdout => { expect(stdout).toMatch(INPUT_ERROR_EN), done(); }
    );
  });

  it("when invalid parameter '--', error messages should be returnded", done => {
    execCall(
      '--',
      stdout => { expect(stdout).toMatch(INPUT_ERROR_FR), done(); }
    );
  });

  it('when input --help, help messages should be returned', done => {
    execCall(
      `--${CommandEnum.HELP}`,
      stdout => { expect(stdout).toMatch(HELP_MESSAGE_TXT_EN), done(); }
    );
  })
});

describe('testing filter function', () => {
  it("when invalid parameter 'filter', error messages should be returnded", done => {
    execCall(CommandEnum.FILTER, (stdout) => {
      expect(stdout).toMatch(INPUT_ERROR_EN);
      done();
    })
  });

  it("when invalid parameter '--filter=', error messages should be returnded", done => {
    execCall(`--${CommandEnum.FILTER}=`, (stdout) => {
      expect(stdout).toMatch(INPUT_ERROR_FR);
      done()
    })
  });

  it('if pattern string is a random string, found nothing notice should be returned', done => {
    const RandomPattern = 'HG87J&';
    execCall(`--${CommandEnum.FILTER}=${RandomPattern}`, (stdout) => {
      expect(stdout).toMatch(NONE_FOUND_TXT);
      done();
    })
  });

  it("when it has right input '--filter=ry', the return value should contain certain strings", done => {
    const rightNames = (extractNames(RyPatternRes) as [])
      .flat(Number.MAX_SAFE_INTEGER) 
      .filter(Boolean) as string[];
    execCall(`--${CommandEnum.FILTER}=ry`, (stdout) => {
      for (const name of rightNames)
        expect(stdout).toMatch(name);
      done();
    })
  })

});

describe('testing count function', () => {
  it("when it has right input '--count', the return value should contain certain strings", done => {
    const Rightnames = (extractNameAndCnt(RightCountRes) as [])
      .flat(Number.MAX_SAFE_INTEGER) 
      .filter(Boolean) as string[];
    execCall(`--${CommandEnum.COUNT}`, (stdout) => {
      for (const name of Rightnames)
        expect(stdout).toMatch(name);
      done();
    })
  });
});

function extractNameAndCnt<T extends CountResType[] | CountResType>(obj: T): ExtractFunRetType {
  if (!obj || typeof(obj) != 'object')
    return null
  const name = Array.isArray(obj) ? null : obj.name,
    cnt = Array.isArray(obj) ? null : obj.count,
    res = (!name || !cnt) ? null : `${name} [${cnt}]`;
  return Reflect.ownKeys(obj).map(k => {
    const v = (obj as CountResType)[k as keyof CountResType];
    return extractNameAndCnt(v);
  }).concat(res);
}

function extractNames<T extends PatternResType[] | PatternResType>(obj: T): ExtractFunRetType  {
  if (!obj || typeof(obj) != 'object')
    return null;
  const name = Array.isArray(obj) ? null : obj.name;
  return Reflect.ownKeys(obj).map(k => {
    const v = (obj as PatternResType)[k as keyof PatternResType];
    return extractNames(v);
  }).concat(name);
}