import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: 'chathub-ac8dd',
      privateKey:
        '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC9XLs0+blDeZGt\n3NfqRY0VOQZn+OM7nTdM+53xx9RrpV0JA0KjTEXwLKtC7zweixhOWjyQpJ/YDLi4\nFQhyo9XT3pdE5D2Qud2+punTlW6dY2AhZLin0BTb0BPBo5wp0991CR+D/GQhb5jE\nTNIlsaOCDwh8LaagWxxi3dDi6CKgsWrdhM0TP+NE2hB7tIEuAoesCm3OxE5UUR4q\nUlxiHmgmnb8UrT+i60YxkcGKSSyMr20D6fgLlFuo9pLqYl5s3PanFw2g2W5V0cIf\n/oKbCcPqzXXJ7+M70PSdLBgSqTid8NL4ZIw7NkTZS6IWY2d1AE3Z7mSWoOVoj/3J\n56wpTY4fAgMBAAECggEAErUEH/bbtCxgyL0ch4RZEu1DRY1zXwK1FK6qEXMdK4h2\nnHSGzMmBz0X0CI5h16w3ubKocRGr/BTY2tBMUvPK8aQrBYWwbCL9Vd+Sq6U2yRp1\nw/BgKnpTO5pezHtBUWog+6SFfIbrZwvQGvRySxvPFc/H/Glchx/F7VTeIf+ucnlo\nkqkDzNy4lEJX/awriKx1B9x/IGTnIjby2Qm8uV88Elib0Qq0d93VcaQ2bWGV54Te\npwUsJ2Y0QONOJh68yZQGt+adAXGeoFtvR4xGrOUC0Rl70a6PC+DTwtsOIQUE7ILP\np8sc6ATh7qhb243qBwCju75YhS6Sw7j2DUuJK/uDwQKBgQD+ILPuA2FdUbDh2KBo\nxW0JivKK9z+4GuLFoTNg6FKC9rQ+nuHxA/SahJOW3XEOg4JNadMMa9Wdfs77E3pj\nXe8LgHvX//6BvzyqPZHgHBzWKimmcX7gSeEnW0DgpK4LUeltFlcNbBAl+uM5ZzJI\n8GFDKYXqdc36eM8eQVVYROOzRwKBgQC+weCnSIidwwcKgye5ES8wlgJSP0VHFWoY\nw/cuuUCf4bCzGfX7jD26Z8+R1Ak9JmPC7HeGwfkOClmcNi3eMnvHD675tuzzqLCA\nT6sNXdm9RYv8dFeM5FcAIn3TJwAZFjOEt2XZJ1UMik1LpjuvY6Zd/kypb+imtbgS\nj+EOy3XKaQKBgQDeUs/3H5/zmz9LJlCXuHi/C39Lkil9sI/KZE/lrPpatuhTjH6Q\nc2xwLiJMryh0kRrTDQzlZgW5RrJft9evzQMPpfUysDQBYMP7D+hqD04vEy3i/pII\nOLowy0XEAm59WskDdbLs/ChYgdh+ZMj6RMpijpYo2607Pqu8hV3b3lDyiwKBgHkx\nKe59ybYZYw7Ntt4ASe/fTkg8xGHd/BMR5af8sE8jjySquLoBJnKYY6qtgNUl37nG\njEXEVNwTvUzeqxOBFVyp3SvviOlg4goTE4ShfKWgWsigjcMIizGduDz/iTNnBIIs\nFnv5XjJiZ6tJSKAselU7LC911uSbjP/WA1Fn+EUJAoGANpycDj+5Jn0+FHQBV6CV\nfZUwrK7XG6ipTmVMmUmeOpT2OWRGzxFvVgSVb0+tR9bl0uFQsz5S5J1QZ/0ZIAte\nboUp3bOM2RnKOstZZmnGAuBRAAePc74xZ5qPP/NGyjOYfqWeQO87IrewOgTBpeY3\nfuavqP2iVznOdtwRrzjGL0Q=\n-----END PRIVATE KEY-----\n',
      clientEmail: 'firebase-adminsdk-y9m6i@chathub-ac8dd.iam.gserviceaccount.com',
    }),
  });
}

export default admin;
