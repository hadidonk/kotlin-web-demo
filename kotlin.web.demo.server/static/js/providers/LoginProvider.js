/*
 * Copyright 2000-2012 JetBrains s.r.o.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Created with IntelliJ IDEA.
 * User: Natalia.Ukhorskaya
 * Date: 3/30/12
 * Time: 3:37 PM
 */

var LoginProvider = (function () {

    function LoginProvider() {

        var instance = {
            login: function (type) {
                login(type);
            },
            logout: function () {
                logout();
            },
            getUserName: function () {
                getUserName();
            },
            onLogin: function (userName) {
            },
            onLogout: function () {
            },
            onFail: function (status, statusBarMessage) {
            }
        };

        function login(type) {
            blockContent();
            $.ajax({
                url: generateAjaxUrl("authorization"),
                context: document.body,
                success: function(data){
                    unBlockContent();
                    onLoginSuccess(data);
                },
                dataType: "text",
                type: "GET",
                data: {args: type},
                timeout: 10000,
                error: function (jqXHR, textStatus, errorThrown) {
                    unBlockContent();
                    instance.onFail(textStatus + " : " + errorThrown, ActionStatusMessages.login_fail);
                }
            });
        }

        function logout() {
            blockContent();
            $.ajax({
                url: generateAjaxUrl("logout"),
                context: document.body,
                success: function (data) {
                    unBlockContent();
                    instance.onLogout(data);
                },
                dataType: "text",
                type: "GET",
                timeout: 10000,
                error: function (jqXHR, textStatus, errorThrown) {
                    unBlockContent();
                    instance.onFail(textStatus + " : " + errorThrown, ActionStatusMessages.login_fail);
                }
            });
        }

        function getUserName() {
            blockContent();
            $.ajax({
                url: generateAjaxUrl("getUserName"),
                context: document.body,
                success: function (data) {
                    unBlockContent();
                    if (checkDataForNull(data)) {
                        instance.onLogin(data);
                    } else {
                        instance.onFail("Username is null.", ActionStatusMessages.login_fail);
                    }
                },
                dataType: "json",
                type: "GET",
                timeout: 10000,
                error: function (jqXHR, textStatus, errorThrown) {
                    unBlockContent();
                    instance.onFail(textStatus + " : " + errorThrown, ActionStatusMessages.login_fail);
                }
            });
        }

        function onLoginSuccess(data) {
            document.location.href = data;
        }

        return instance;
    }

    return LoginProvider;
})();