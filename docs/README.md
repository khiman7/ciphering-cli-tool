# Ciphering CLI Tool
This is CLI tool for text encrypting on pure Node.js

## Run the app
You will need Node.js installed to run this tool

    node ciphering-tool -c {config} -i {input} -o {output}

### Description
CLI tool accepts 3 options:
* **-c, --config** - is required option for ciphers config with pattern `{XY(-)}n`, where:
    * `X` is a cipher mark:
        * `C` - Caesar cipher (with shift 1)
        * `A` - Atbash cipher
        * `R` - ROT-8 cipher
  * `Y` is flag of encoding or decoding
    * `1` - encoding
    * `0` - decoding
* **-i, --input**  - option for a path to input file (process.stdin if not provided)
* **-o, --output** - option for a path to input file (process.stdout if not provided)
    
### Usage

```bash
$ node ciphering-tool -c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "$" symbol!`

> output.txt
> `Myxn xn nbdobm. Tbnnfzb ferlm "$" nhteru!`

```bash
$ node ciphering-tool -c "C1-C1-C1-R1-A-C1-C1" -o "./output.txt"
```

> process.stdin
> `This is secret. Message about "$" symbol!`

> output.txt
> `Xjiy iy ymozmx. Emyyqkm qpcwx "$" ysepcf`

```bash
$ node ciphering-tool -c "C1-R1-A-A-R0-C0"
```

> process.stdin
> `This is secret. Message about "$" symbol!`

> process.stdout
> `This is secret. Message about "$" symbol!`