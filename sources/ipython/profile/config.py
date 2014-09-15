# Copyright 2014 Google Inc. All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#  http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""IPython configuration customization."""

import os

# Get a reference to the configuration object.
c = get_config()

# Implicitly imported packages.
c.InteractiveShellApp.extensions = [
  'gcp.interactive'
]

# Startup code.
c.InteractiveShellApp.exec_lines = [
]

# Static files.
c.NotebookApp.extra_static_paths = [
  os.path.join(os.path.dirname(__file__), 'static')
]

# Custom notebook manager
env = os.environ.get('IPYTHON_ENV', '')
if env == 'cloud':
  c.NotebookApp.notebook_manager_class = 'IPythonExtensions.gcp.StorageNotebookManager'
elif env == 'memory':
  c.NotebookApp.notebook_manager_class = 'IPythonExtensions.gcp.MemoryNotebookManager'

if os.environ.get('IPYTHON_DEBUG', '') != '':
  c.NotebookApp.log_level = 'DEBUG'