const logoutButton = new LogoutButton();
logoutButton.action = () => {
    ApiConnector.logout(response => {
        if(response.success){
            location.reload();
        }
    })
};

ApiConnector.current(response => {
    if(response.success){
        ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard();
function getCoursesFunction(){
    ApiConnector.getStocks(response =>{
        if(response.success){
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
};
getCoursesFunction();
setInterval(() => getCoursesFunction(), 60000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if(!response.success) {
            moneyManager.setMessage(response.success, response.error);
        } else {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Баланс пополнен");
        }
    })
};
moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if(!response.success) {
            moneyManager.setMessage(response.success, response.error);
        } else {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Валюта конвертирована");
        }
    })
};
moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if(!response.success) {
            moneyManager.setMessage(response.success, response.error);
        } else {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Перевод доставлен");
        }
    })
};

const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
    if(response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});
favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if(!response.success) {
            favoritesWidget.setMessage(response.success, response.error);
        } else {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Пользователь добавлен в избранное");
        }
    })
};
favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if(!response.success) {
            favoritesWidget.setMessage(response.success, response.error);
        } else {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Пользователь успешно удален");
        }
    })
};
