import { render, screen, waitFor } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import ShelfModal from '@/components/ShelfModal.vue';

test.only('入力内容に不備があれば、エラーメッセージを表示できる', async () => {
  render(ShelfModal);

  await userEvent.click(screen.getByText(/書籍の登録/));

  const inputTitleElm = screen.getByLabelText('タイトル');
  const titleErrorElm = screen.getByLabelText('タイトル入力エラー');
  expect(titleErrorElm).not.toBeVisible();

  // フォームのタイトル欄に、空白文字を入力する
  const title = '    ';
  userEvent.type(inputTitleElm, title);
  expect(inputTitleElm).toHaveValue(title);

  userEvent.click(screen.getByText(/保存する/));
  await waitFor(() => {
    expect(titleErrorElm).toBeVisible();
  });
});
