interface Args {
  token: string | undefined;
  title: string;
  message: string;
}

export const sendNotification = async ({ token, title, message }: Args) => {
  if (!token) return;
  try {
    fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        host: 'exp.host',
        accept: 'application/json',
        'accept-encoding': 'gzip, deflate',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        to: token,
        title: title,
        body: message,
      }),
    });
  } catch (error) {
    console.log(error)
  }
};
