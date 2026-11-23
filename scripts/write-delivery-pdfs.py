#!/usr/bin/env python3
from pathlib import Path
from fpdf import FPDF

FONT = "/usr/share/fonts/opentype/ipafont-gothic/ipag.ttf"
OUT = Path("/workspace/artifacts")


class Manual(FPDF):
    def __init__(self, title: str):
        super().__init__(format="A4")
        self.alias_nb_pages()
        self.doc_title = title
        self.add_font("ipa", "", FONT)
        self.set_auto_page_break(auto=True, margin=18)
        self.set_margins(18, 18, 18)

    def header(self):
        if self.page_no() == 1:
            return
        self.set_font("ipa", size=9)
        self.set_text_color(80, 80, 80)
        self.cell(0, 8, f"株式会社コスギ　{self.doc_title}", align="L")
        self.ln(4)

    def footer(self):
        self.set_y(-14)
        self.set_font("ipa", size=9)
        self.set_text_color(80, 80, 80)
        self.cell(0, 8, f"{self.page_no()} / {{nb}}", align="C")

    def h1(self, text: str):
        self.ln(2)
        self.set_font("ipa", size=16)
        self.set_text_color(0, 37, 89)
        self.multi_cell(0, 9, text)
        self.ln(2)

    def h2(self, text: str):
        self.ln(2)
        self.set_font("ipa", size=13)
        self.set_text_color(0, 37, 89)
        self.multi_cell(0, 8, text)
        self.ln(1)

    def p(self, text: str):
        self.set_font("ipa", size=10.5)
        self.set_text_color(20, 20, 20)
        self.multi_cell(0, 6.4, text)
        self.ln(1.4)

    def bullet(self, text: str):
        self.set_font("ipa", size=10.5)
        self.set_text_color(20, 20, 20)
        self.multi_cell(0, 6.4, "・" + text)
        self.ln(0.4)


def cover(pdf: Manual, subtitle: str):
    pdf.add_page()
    pdf.set_font("ipa", size=11)
    pdf.set_text_color(0, 37, 89)
    pdf.cell(0, 8, "技術納品書", align="L")
    pdf.ln(16)
    pdf.set_font("ipa", size=18)
    pdf.multi_cell(0, 10, pdf.doc_title)
    pdf.ln(4)
    pdf.set_font("ipa", size=12)
    pdf.set_text_color(20, 20, 20)
    pdf.multi_cell(0, 7, subtitle)
    pdf.ln(8)
    pdf.set_font("ipa", size=11)
    for line in [
        "サイト名　株式会社コスギ 公式サイト",
        "公開URL　https://cosugi-akita.com/",
        "文書日付　2026年11月23日",
        "対象　レンタルサーバー（FTP公開、PHP 8系）",
    ]:
        pdf.cell(0, 8, line)
        pdf.ln(7)


def setup_doc():
    pdf = Manual("サーバー設置手順書")
    cover(pdf, "完成データの設置、メール設定、SSL、障害時の切り分け")
    pdf.h1("1. 納品物")
    pdf.p("cosugi-akita-ftp.zip を解凍すると、直下に index.html があります。この中身が公開データです。サーバー上で npm や Node.js は使いません。")
    pdf.bullet("index.html と各ページの HTML")
    pdf.bullet("assets（CSS、JavaScript）")
    pdf.bullet("images（写真）")
    pdf.bullet("contact-send.php（問い合わせ送信）")
    pdf.bullet("private/contact-config.php（メール設定）")
    pdf.bullet("private/contact-lib.php（送信処理）")
    pdf.bullet(".htaccess と private/.htaccess")
    pdf.h1("2. 必要なサーバー環境")
    pdf.bullet("PHP 8.0 以上。8.1 または 8.2 を推奨")
    pdf.bullet("PHP拡張 mbstring を有効にする")
    pdf.bullet("Apache の mod_rewrite と .htaccess の許可")
    pdf.bullet("セッションが使えること")
    pdf.bullet("SSL（https）を有効にできること")
    pdf.bullet("メール送信は、標準の mb_send_mail、または SMTP 認証")
    pdf.h1("3. アップロード先")
    pdf.p("ドメイン cosugi-akita.com のドキュメントルート直下です。フォルダ名は public_html、www、html など、サーバーにより異なります。")
    pdf.p("https://cosugi-akita.com/ を開いたとき index.html が表示される位置に置きます。zip 名のフォルダをもう一段入れないでください。")
    pdf.p(".htaccess と private フォルダは隠しファイルです。FTPソフトで不可視ファイルを表示して、権限も含めてアップロードします。private フォルダは 705、その中の PHP は 604 を目安にしてください。書き込みが必要なのは private フォルダです。送信記録 mail-log.csv をこの中に作成します。")
    pdf.h1("4. メール設定")
    pdf.p("private/contact-config.php を開き、次の項目を記入します。納品時点では to と from は空です。空のままではメールは送られず、画面も送信完了になりません。仮のアドレスは入れないでください。")
    pdf.bullet("to：問い合わせを受け取るメールアドレス")
    pdf.bullet("from：送信元。必ず @cosugi-akita.com のアドレス")
    pdf.bullet("from_name：株式会社コスギ（変更不要）")
    pdf.bullet("hosts：cosugi-akita.com と www.cosugi-akita.com（変更不要）")
    pdf.p("標準ではサーバーのメール機能（mb_send_mail）で送ります。差出人は from、返信先は問い合わせ者のメールアドレスです。問い合わせ者の名前は件名やヘッダーには使わず、本文にだけ記載します。")
    pdf.h2("SMTP認証が必要な場合")
    pdf.p("サーバー会社から SMTP のホスト、ポート、ユーザー、パスワードを指定された場合だけ、smtp の enabled を true にします。")
    pdf.bullet("host：SMTPサーバー名")
    pdf.bullet("port：通常は 587。SSL直結の場合は 465")
    pdf.bullet("secure：587 なら tls、465 なら ssl")
    pdf.bullet("user と password：そのメールアドレスの認証情報")
    pdf.p("パスワードを書いた contact-config.php は private フォルダに置き、Webから直接開けない状態を維持してください。再アップロードのときに、記入済みの設定ファイルを空のファイルで上書きしないでください。")
    pdf.h1("5. SSL")
    pdf.p("サーバーの管理画面で cosugi-akita.com の SSL を有効にします。可能であれば http から https へ転送します。転送設定はサーバー会社の案内に従ってください。サイト側の .htaccess はページの表示用であり、証明書の発行は行いません。")
    pdf.h1("6. 設置後の確認")
    pdf.p("公開後チェックリストのURLを、パソコンとスマートフォンで開きます。問い合わせは、設定前と設定後の両方を確認します。")
    pdf.bullet("設定前：送信完了と表示されず、受信設定が未完了である旨が出ること")
    pdf.bullet("設定後：テスト送信が指定の受信箱に届くこと")
    pdf.bullet("届いたメールの返信先が、入力した問い合わせ者のアドレスであること")
    pdf.bullet("private/mail-log.csv に sent または failed が記録されること")
    pdf.bullet("https://cosugi-akita.com/private/ が開けないこと")
    pdf.h1("7. 障害時の切り分け")
    pdf.h2("ページが白い、または404")
    pdf.bullet("index.html がドキュメントルート直下にあるか")
    pdf.bullet(".htaccess がアップロードされているか。ない場合は /products/ などの再読み込みが失敗することがある")
    pdf.bullet("PHPのバージョンが 8 未満でないか")
    pdf.h2("問い合わせだけ失敗する")
    pdf.bullet("private/mail-log.csv の detail を見る")
    pdf.bullet("config の場合は to または from が空、または形式が違う")
    pdf.bullet("mail の場合はサーバーの送信機能。SMTP指定があれば smtp を有効にする")
    pdf.bullet("from が cosugi-akita.com 以外だと拒否されるサーバーがある")
    pdf.bullet("mbstring が無効だと送信できない")
    pdf.h2("完了画面だけ出てメールが来ない")
    pdf.p("この構成では、送信処理が成功した場合だけ完了画面になります。完了と出ているのに届かない場合は、迷惑メールフォルダ、受信箱の転送設定、mail-log.csv が sent かを確認してください。")
    pdf.h1("8. 管理画面について")
    pdf.p("/admin/ 以下の画面は、開いているブラウザの中だけに保存します。サーバーの共通データではありません。別のパソコンでは内容は共有されません。今回の納品に、サーバー保存型の管理機能は含まれていません。")
    pdf.output(OUT / "サーバー設置手順書.pdf")


def checklist_doc():
    pdf = Manual("公開後チェックリスト")
    cover(pdf, "公開直後に確認する項目。メールの実受信は、受信アドレス設定後に実施する")
    pdf.h1("表示")
    for url, name in [
        ("https://cosugi-akita.com/", "トップページ。メイン画像と業種別の写真が出る"),
        ("https://cosugi-akita.com/products/", "取扱商品"),
        ("https://cosugi-akita.com/customize/", "加工・刺繍"),
        ("https://cosugi-akita.com/cases/", "導入事例"),
        ("https://cosugi-akita.com/contact/", "お問い合わせ"),
        ("https://cosugi-akita.com/privacy/", "プライバシーポリシー"),
    ]:
        pdf.bullet(f"{name}　{url}")
    pdf.p("会社概要、代表挨拶、アクセスはトップページ内です。各URLを直接開き、再読み込みしても同じページが残ることを確認します。")
    pdf.h1("共通")
    pdf.bullet("アドレスバーが https である")
    pdf.bullet("ブラウザのタブにアイコンが出る")
    pdf.bullet("パソコンとスマートフォンで、文字や写真が画面外にはみ出さない")
    pdf.bullet("トップ、商品、加工、事例、問い合わせのあいだをリンクで移動できる")
    pdf.bullet("https://cosugi-akita.com/private/ は 403 などで本文が見えない")
    pdf.h1("お問い合わせ")
    pdf.bullet("会社名、担当者名、メールアドレス、相談内容が空だとエラーになり、完了画面にならない")
    pdf.bullet("メールアドレスの形式が違うとエラーになる")
    pdf.bullet("個人情報の同意がないとエラーになる")
    pdf.bullet("to と from が空のままでは、完了画面にならない")
    pdf.bullet("正しい宛先を設定したあとのテスト送信だけが、完了画面になる")
    pdf.bullet("そのテストメールが受信箱に届く")
    pdf.bullet("返信先が、フォームに入力したアドレスである")
    pdf.bullet("private/mail-log.csv に結果が残る")
    pdf.p("納品時点では受信アドレスが未確定です。実メールの到着は、アドレス記入後の確認項目です。")
    pdf.h1("やらないこと")
    pdf.bullet("private/contact-config.php に、存在しない仮アドレスを入れない")
    pdf.bullet("管理画面の保存を、全社共通の更新機能として案内しない")
    pdf.output(OUT / "公開後チェックリスト.pdf")


def maintenance_doc():
    pdf = Manual("サイト保守・更新手順書")
    cover(pdf, "ページの差し替え、メール設定の維持、再生成の手順")
    pdf.h1("1. 構成")
    pdf.p("公開サーバーにあるのは、HTML、CSS、JavaScript、画像、問い合わせ用PHPです。記事のデータベースはありません。Node.js はサーバーにインストールしません。")
    pdf.h1("2. ソースからの再生成")
    pdf.p("将来の修正担当者は、GitHub のソースを取得し、作業用パソコンで次を実行します。")
    pdf.p("npm install")
    pdf.p("npm run build:ftp")
    pdf.p("artifacts/cosugi-akita-ftp.zip が新しい公開データです。手順の詳細はリポジトリ内の docs/ftp-build.md にあります。")
    pdf.p("GitHub Pages 用のビルドは別です。Pages 側のサイトは、このメール送信設定を使いません。")
    pdf.h1("3. 差し替え時の注意")
    pdf.bullet("サーバー上の private/contact-config.php を、新しいZIPの空設定で上書きしない")
    pdf.bullet("mail-log.csv が必要な場合は、差し替え前に控える")
    pdf.bullet(".htaccess と private/.htaccess は残す")
    pdf.bullet("画像ファイルは images フォルダを置き換える。HTMLが画像名を参照しているため、名前を変えた場合は再生成が必要")
    pdf.h1("4. 問い合わせメール")
    pdf.p("受信アドレスを変えるときは private/contact-config.php の to だけを変更します。送信元 from は cosugi-akita.com のアドレスのままにします。変更後はチェックリストのテスト送信を1通行い、完了画面、受信、返信先、mail-log.csv を確認します。")
    pdf.p("送信できない場合は、設置手順書の「障害時の切り分け」に従って、ログの status と detail を見ます。")
    pdf.h1("5. 管理画面")
    pdf.p("/admin/ の新着情報、商品、Instagram、刺繍、事例の編集内容は、そのブラウザの中だけに保存されます。サーバーに共有保存される機能ではありません。別の端末や、ブラウザの保存データを消したあとは元に戻ります。サーバー共通の更新画面が必要になった場合は、別途開発が必要です。")
    pdf.h1("6. バックアップ")
    pdf.bullet("公開フォルダ一式")
    pdf.bullet("private/contact-config.php（受信設定と、SMTPを使う場合の認証情報）")
    pdf.bullet("private/mail-log.csv")
    pdf.p("認証情報をメールやチャットに平文で置かないでください。")
    pdf.h1("7. 問い合わせの運用")
    pdf.p("フォームが使えない間は、サイトに記載の電話番号 018-868-0567 で受けます。フォームは送信に成功したときだけ完了と表示します。")
    pdf.output(OUT / "サイト保守・更新手順書.pdf")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    setup_doc()
    checklist_doc()
    maintenance_doc()
    for name in ["サーバー設置手順書.pdf", "公開後チェックリスト.pdf", "サイト保守・更新手順書.pdf"]:
        path = OUT / name
        print(path.name, path.stat().st_size)
