import twint


if __name__ == '__main__':
    # Configure
    c = twint.Config()
    c.Username = "realshehzard"
    c.Search = "love"

    # Run
    twint.run.Search(c)